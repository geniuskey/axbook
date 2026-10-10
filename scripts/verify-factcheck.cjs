const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
const measure = fs.readFileSync('chapters/measure.html', 'utf8'), shop = fs.readFileSync('chapters/shopfloor.html', 'utf8');
function fn(source, name) {
  const start = source.indexOf('function ' + name + '(');
  assert.ok(start >= 0, name);
  let pos = source.indexOf('{', start), level = 1, end = pos + 1;
  while (level && end < source.length) { if (source[end] === '{') level++; if (source[end] === '}') level--; end++; }
  return source.slice(start, end);
}
const context = vm.createContext({seed:7, rules:Array.from({length:4},()=>({checked:true}))});
for(const name of ['rng','nrm','sample','t95','meanContrast','nEst','nCmp']) vm.runInContext(fn(measure,name), context);
vm.runInContext(fn(shop,'detect'),context);
let checks=0, scripts=0;
// NIST tabulated t(.975), direct reference values from the official table.
for(const [df,value] of [[1,12.706],[2,4.303],[3,3.182],[4,2.776],[8,2.306],[20,2.086],[30,2.042],[31,2.040],[40,2.021],[60,2.000],[80,1.990],[100,1.984]]) {
  assert.ok(Math.abs(context.t95(df)-value)<.0006, `t df=${df}`); checks++;
}
assert.equal(context.t95(4.9),2.776);checks++;
// Independent gamma-free t normalization: integrate the unnormalized density over [0,∞),
// transformed by x=tan(theta), and compare the upper tail at each computed critical value.
function integrate(nu, limit) {
  const n=6000, step=limit/n;
  function density(theta) { if(theta===Math.PI/2)return nu===1?1:0; const t=Math.tan(theta);return Math.pow(1+t*t/nu,-(nu+1)/2)*(1+t*t); }
  let s=density(0)+density(limit);
  for(let j=1;j<n;j++)s+=(j%2?4:2)*density(j*step);
  return s*step/3;
}
for(const df of [1,2,3,4,8,12,25,30,31,40,60,100,200,796]) {
  const cdf=.5+.5*integrate(df,Math.atan(context.t95(df)))/integrate(df,Math.PI/2);
  assert.ok(Math.abs(cdf-.975)<.00004, `critical probability df=${df}: ${cdf}`);checks++;
}
const contrast=context.meanContrast([{m:120,v:4},{m:100,v:9},{m:120,v:16},{m:110,v:25}],[1,-1,-1,1],3,120);
assert.equal(contrast.value,10/120);checks++;
assert.ok(Math.abs(contrast.df-54**2/((4**2+9**2+16**2+25**2)/2))<1e-12);checks++;
assert.ok(contrast.half>1.96*Math.sqrt(54)/120);checks++;
for(const mean of [24,84,120]) for(const cv of [.1,.25,.6]) {
  const s=context.sample(mean,cv,100000);
  assert.ok(Math.abs(s.m/mean-1)<.01,`sample mean ${mean} cv ${cv}`);checks++;
  const observedCV=Math.sqrt(s.v*100000)/s.m;
  assert.ok(Math.abs(observedCV/cv-1)<.02,`sample cv ${observedCV}`);checks++;
}
assert.equal(context.nEst(1.96,.4,.1),62);checks++;
assert.equal(context.nCmp(1.96,.4,.2),63);checks++;
for(const [data,index,rule] of [[[2.1,2.2,0],2,2],[[-2.1,-2.2,0],2,2],[[1.1,1.2,1.3,1.4,0],4,3],[[-1.1,-1.2,-1.3,-1.4,0],4,3]]) {
  assert.ok(context.detect(data)[index].includes(rule),JSON.stringify(data));checks++;
}
// Exhaust all five-point windows independently, including strict sigma boundaries.
const values=[-2.1,-2,-1.1,-1,0,1,1.1,2,2.1];
for(let code=0;code<values.length**5;code++) {
  let k=code,x=[];for(let j=0;j<5;j++){x.push(values[k%values.length]);k=Math.floor(k/values.length);}
  const actual=context.detect(x)[4];
  for(const [rule,len,threshold,count] of [[2,3,2,2],[3,5,1,4]]) {
    const tail=x.slice(-len), expected=[-1,1].some(sign=>tail.filter(v=>v*sign>threshold).length>=count);
    assert.equal(actual.includes(rule),expected);checks++;
  }
}
for(const file of fs.readdirSync('chapters').filter(f=>f.endsWith('.html'))) {
  for(const m of fs.readFileSync('chapters/'+file,'utf8').matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if(/\bsrc\s*=/.test(m[1])||!m[2].trim())continue;
    if(/application\/ld\+json/.test(m[1]))JSON.parse(m[2]);else new vm.Script(m[2],{filename:file}); scripts++;
  }
}
console.log(`${checks} numerical/rule checks; ${scripts} inline JavaScript/JSON checks passed`);
