!function(e,t){var n=function(e,n){var s,h,l
e.source===t?(s=RegExp(e,n),n=i(s)):(s=e,n=i(s)),h=p(s),l=[]
for(var g=0;g<h.length;g++)l.push(RegExp(h[g],n))
this.original=s,this.sourceSteps=h,this.steps=l,this.first=l[0],this.last=l[l.length-1],this.length=l.length,this.source=s.source,this.flags=n,this.haveSameFlagsAs=function(e){return e.flags?this.flags===e.flags:this.flags===i(e)},this.global=s.global,this.ignoreCase=s.ignoreCase,this.multiline=s.multiline,this.sticky=!!s.sticky,this.unicode=!!s.unicode,this.match=function(e,n){var i=[],s=[]
e=""+e
for(var h,l,g=this.length-1;g>=0;g--)if(h=this.steps[g],h.lastIndex=0,l=h.exec(e))do if((!this.global&&!n||!r(l.index,s))&&(i.push({stepIndex:g,rate:(g+1)/this.length,data:l[0],index:l.index}),s.push(l.index,l.index+l[0].length-1),!this.global&&!n||!n&&n!==t)){g=-1
break}while(this.global&&(l=h.exec(e)))
return i.length<1?null:i=i.sort(function(e,t){return e.index-t.index})}},r=function(e,t){for(var n=0,r=t.length;r>n;n+=2)if(e>=t[n]&&e<=t[n+1])return!0
return!1},i=function(e){return(e.global?"g":"")+(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.sticky?"y":"")+(e.unicode?"u":"")},s=function(e,t,n){n=n||0
for(var r,i=t,s=e.length,h=0;s>i;i++)if(r=e.charAt(i),"("!=r){if(")"==r&&(h--,0>=h))return i}else h++
return e.length-n},h=/\((?:\?[:=!]|)\)/,l=/\\./g,g=/\|/g,a=/(\(\?:|\(\?=|\(\?!|\()/,u=/^((\*\?)|(\+\?)|\*|\+|\?)/,o=/^\{([0-9]+)(,?[0-9]*\})/,f=/^\{([0-9]+)(,[0-9]*)\}/,c=/^\{([0-9]+)\}/,p=function v(e){var e=e.source
if(h.test(e))return[]
var t,n,r=e.replace(l,String.fromCharCode(9e3)+String.fromCharCode(9e3)),i=[],p="",x="",d=function(e){i.push(0==i.length?e:i[i.length-1]+""+e)}
if(r.indexOf("|")>=0){for(var b,m="",E=0,y=r.length;y>E;E++)if(b=r.charAt(E),"("==b){var R=s(r,E)
m+=r.substring(E,R+1).replace(g,String.fromCharCode(9e3)),E+=R-E}else m+=b
if(m.indexOf("|")>=0){for(var C,A=m.split(g),t=[],k=0,E=0,y=A.length;y>E;E++)C=e.substring(k,k+A[E].length),k+=A[E].length+1,t.push(v(RegExp(C)))
for(var S=[],E=0;E<t.length;E++)S.push(t[E].length)
for(var I,E=0,y=Math.max.apply(Math,S);y>E;E++){I=p
for(var w=0;w<t.length;w++)I+=t[w][Math.min(E,t[w].length-1)]+"|"
i.push(I.substring(0,I.length-1))}return p="",i}}for(var b,E=0,y=e.length;y>E;E++)if(b=e.charAt(E),x="","^"!=b&&"$"!=b)if("("!=b){if("["==b)x=e.substring(E,r.indexOf("]",E)+1)
else if("\\"==b){var R=e.charAt(E+1)
x="u"==R||"U"==R?b+e.substring(E+1,E+6):"c"==R||"C"==R?b+R+e.charAt(E+2):"x"==R||"X"==R?b+e.substring(E+1,E+4):b+e.charAt(E+1)}else x=b
if(x){var M=e.substring(E+x.length),C=u.exec(M)
if(C){x+=C[0],E+=x.length-1,d(p+""+x),p=""
continue}if(C=c.exec(M)){var n=i[i.length-1]||"",O=parseInt(C[1])
if(E+=(x+C[0]).length-1,0===O)d(p+x+C[0])
else for(var w=1;O>=w;w++)i.push(n+p+x+"{"+w+"}")
p=""
continue}if(C=f.exec(M)){var n=i[i.length-1]||"",O=parseInt(C[1])
if(E+=(x+C[0]).length-1,0===O)d(p+x+C[0])
else for(var w=1;O>=w;w++)i.push(n+p+x+"{"+w+C[2]+"}")
p=""
continue}E+=x.length-1,d(p+""+x),p=""}else;}else{var R=s(r,E),F=a.exec(e.substring(E))
if(!F)throw"Error parsing : /"+e+"/"
if("(?!"==F[1])d(e.substring(E,R+1))
else{C=e.substring(E+F[1].length,R),t=v(RegExp(C))
var U="",X=e.substring(R+1),$=u.exec(X),O=0,j=""
X&&($&&(U=$[1]),$=o.exec(X),$&&(O=parseInt($[1]),j=$[2],U=0===O?"{0"+j:"{1"+j)),n=i.length>0?i[i.length-1]:""
for(var w=0,q=t.length;q>w;w++)if(w+1>=q&&O>1){for(var k=1;O>=k;k++)i.push(n+p+F[1]+t[w]+"){"+k+j)
U="{"+O+j}else i.push(n+p+F[1]+t[w]+")"+U)}p="",E+=R-E+(U||"").length}else p+=b
return p&&d(p),i}
e.liveRegExp=function(e,t){return new n(e,t)},e.liveRegExp.version="0.9a2",e.liveRegExp.supportSticky=function(){try{return!!RegExp("","y").sticky}catch(e){return!1}}(),e.liveRegExp.supportUnicode=function(){try{return!!RegExp("","u").unicode}catch(e){return!1}}(),e.liveRegExp.createFlags=function(e,t,n,r,i,s){return(e?"g":"")+(t?"i":"")+(n?"m":"")+(r?"y":"")+(i?"u":"")+(s||"")}}(this)
