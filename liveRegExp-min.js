!function(e,t){var n=function(e,n){var s,l,g
e.source===t?(s=RegExp(e,n),n=i(s)):(s=e,n=i(s)),l=h(s),g=[]
for(var a=0;a<l.length;a++)g.push(RegExp(l[a],n))
this.original=s,this.sourceSteps=l,this.steps=g,this.first=g[0],this.last=g[g.length-1],this.length=g.length,this.source=s.source,this.flags=n,this.haveSameFlagsAs=function(e){return e.flags?this.flags===e.flags:this.flags===i(e)},this.global=s.global,this.ignoreCase=s.ignoreCase,this.multiline=s.multiline,this.sticky=!!s.sticky,this.unicode=!!s.unicode,this.match=function(e,n){var i=[],s=[]
e=""+e
for(var h,l,g=this.length-1;g>=0;g--)if(h=this.steps[g],h.lastIndex=0,l=h.exec(e))do if((!this.global&&!n||!r(l.index,s))&&(i.push({stepIndex:g,rate:(g+1)/this.length,data:l[0],index:l.index}),s.push(l.index,l.index+l[0].length-1),!this.global&&!n||!n&&n!==t)){g=-1
break}while(this.global&&(l=h.exec(e)))
return i.length<1?null:i=i.sort(function(e,t){return e.index-t.index})}},r=function(e,t){for(var n=0,r=t.length;r>n;n+=2)if(e>=t[n]&&e<=t[n+1])return!0
return!1},i=function(e){return(e.global?"g":"")+(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.sticky?"y":"")+(e.unicode?"u":"")},s=function(e,t,n){n=n||0
for(var r,i=t,s=e.length,h=0;s>i;i++)if(r=e.charAt(i),"("!=r){if(")"==r&&(h--,0>=h))return i}else h++
return e.length-n},h=function l(e){var t,n,e=e.source,r=e.replace(/\\./g,String.fromCharCode(9e3)+String.fromCharCode(9e3)),i=[],h="",g="",a=function(e){i.push(0==i.length?e:i[i.length-1]+""+e)}
if(r.indexOf("|")>=0){for(var u,o="",f=0,c=r.length;c>f;f++)if(u=r.charAt(f),"("==u){var p=s(r,f)
o+=r.substring(f,p+1).replace(/\|/g,String.fromCharCode(9e3)),f+=p-f}else o+=u
if(o.indexOf("|")>=0){for(var x,v=o.split(/\|/g),t=[],d=0,f=0,c=v.length;c>f;f++)x=e.substring(d,d+v[f].length),d+=v[f].length+1,t.push(l(RegExp(x)))
for(var b=[],f=0;f<t.length;f++)b.push(t[f].length)
for(var m,f=0,c=Math.max.apply(Math,b);c>f;f++){m=h
for(var E=0;E<t.length;E++)m+=t[E][Math.min(f,t[E].length-1)]+"|"
i.push(m.substring(0,m.length-1))}return h="",i}}for(var u,f=0,c=e.length;c>f;f++)if(u=e.charAt(f),g="","^"!=u&&"$"!=u)if("("!=u){if("["==u)g=e.substring(f,r.indexOf("]",f)+1)
else if("\\"==u){var p=e.charAt(f+1)
g="u"==p||"U"==p?u+e.substring(f+1,f+6):"c"==p||"C"==p?u+p+e.charAt(f+2):"x"==p||"X"==p?u+e.substring(f+1,f+4):u+e.charAt(f+1)}else g=u
if(g){var y=e.substring(f+g.length),x=/^((\*\?)|(\+\?)|\*|\+|\?)/.exec(y)
if(x){g+=x[0],f+=g.length-1,a(h+""+g),h=""
continue}if(x=/^\{([0-9]+)\}/.exec(y)){var n=i[i.length-1]||"",R=parseInt(x[1])
if(f+=(g+x[0]).length-1,0===R)a(h+g+x[0])
else for(var E=1;R>=E;E++)i.push(n+h+g+"{"+E+"}")
h=""
continue}if(x=/^\{([0-9]+)(,[0-9]*)\}/.exec(y)){var n=i[i.length-1]||"",R=parseInt(x[1])
if(f+=(g+x[0]).length-1,0===R)a(h+g+x[0])
else for(var E=1;R>=E;E++)i.push(n+h+g+"{"+E+x[2]+"}")
h=""
continue}f+=g.length-1,a(h+""+g),h=""}else;}else{var p=s(r,f),C=/(\(\?:|\(\?=|\(\?!|\()/.exec(e.substring(f))
if(!C)throw"Error parsing : /"+e+"/"
if("(?!"==C[1])a(e.substring(f,p+1))
else{x=e.substring(f+C[1].length,p),t=l(RegExp(x))
var A="",k=e.substring(p+1),S=/^((\*\?)|(\+\?)|\*|\+|\?)/.exec(k),R=0,I=""
k&&(S&&(A=S[1]),S=/^\{([0-9]+)(,?[0-9]*\})/.exec(k),S&&(R=parseInt(S[1]),I=S[2],A=0===R?"{0"+I:"{1"+I)),n=i.length>0?i[i.length-1]:""
for(var E=0,w=t.length;w>E;E++)if(E+1>=w&&R>1){for(var d=1;R>=d;d++)i.push(n+h+C[1]+t[E]+"){"+d+I)
A="{"+R+I}else i.push(n+h+C[1]+t[E]+")"+A)}h="",f+=p-f+(A||"").length}else h+=u
return h&&a(h),i}
e.liveRegExp=function(e,t){return new n(e,t)},e.liveRegExp.version="0.9a1",e.liveRegExp.supportSticky=function(){try{return!!RegExp("","y").sticky}catch(e){return!1}}(),e.liveRegExp.supportUnicode=function(){try{return!!RegExp("","u").unicode}catch(e){return!1}}(),e.liveRegExp.createFlags=function(e,t,n,r,i,s){return(e?"g":"")+(t?"i":"")+(n?"m":"")+(r?"y":"")+(i?"u":"")+(s||"")}}(this)
