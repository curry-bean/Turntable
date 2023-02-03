(function()
{const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;
for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);
new MutationObserver(n=>{for(const o of n)if(o.type==="childList")
for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});
function t(n){const o={};
return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),
n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n)
{if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();const y=(i,e,t)=>Math.max(e,Math.min(i,t)),
P=i=>{const{left:e,top:t,width:s,height:n}=i.getBoundingClientRect(),o=e+s/2,a=t+n/2;return{x:o,y:a}},w=(i,e)=>Math.atan2(e.y-i.y,e.x-i.x),
R=(i,e)=>Math.atan2(Math.sin(i-e),Math.cos(i-e)),A=(i,e,t=n=>n,s)=>{const n=t,o=[];for(let a=0;a<i.length;a+=1){const l=a-e,g=l>=0?l:0,p=a+e+1;
    let f=0,m=0;for(let h=g;h<p&&h<i.length;h+=1)m+=n(i[h]),f+=1;o[a]=s?s(i[a],m/f):m/f}return o},B=i=>i.reduce((e,t)=>e+t,0)/i.length,
    E=(i,e=10)=>{const t=Math.max(0,i.length-e);return i.slice(t)},_=Math.PI*2,v=.75,C=v*60,L=C*_,M=L/60,b=M*.001,S=Math.PI*2,u=()=>{};
    class x{constructor(e){this.el=e,this._isPoweredOn=!1,this._playbackSpeed=1,this._duration=0,this._isDragging=!1,this.center=P(this.el),this.angle=0,
        this.anglePrevious=0,this.maxAngle=S,this.rafId=null,this.timestampPrevious=performance.now(),this.draggingSpeeds=[],this.draggingFrom={},
        this.isReversed=!1,this.onDragStart=this.onDragStart.bind(this),this.onDragProgress=this.onDragProgress.bind(this),
        this.onDragEnd=this.onDragEnd.bind(this),this.loop=this.loop.bind(this),this.callbacks={onDragEnded:u,onAutoRotate:u,onStop:u,onLoop:u},
        this.init()}init(){this.el.addEventListener("pointerdown",this.onDragStart)}get playbackSpeed(){return this._playbackSpeed}set playbackSpeed(e)
        {this.draggingSpeeds.push(e),this.draggingSpeeds=E(this.draggingSpeeds,10),this._playbackSpeed=A(this.draggingSpeeds),
            this._playbackSpeed=B(this.draggingSpeeds),this._playbackSpeed=y(this._playbackSpeed,-4,4)}get secondsPlayed()
            {return this.angle/S/v}get duration(){return this._duration}set duration(e){this._duration=e,this.maxAngle=e*v*S}set isDragging(e)
            {this._isDragging=e,this.el.classList.toggle("is-scratching",e)}get isDragging(){return this._isDragging}powerOn()
            {this._isPoweredOn=!0,this._playbackSpeed=1,this.start()}powerOff(){this._isPoweredOn=!1,this.stop()}onDragStart(e)
            {document.body.addEventListener("pointermove",this.onDragProgress),document.body.addEventListener("pointerup",this.onDragEnd),
            this.center=P(this.el),this.draggingFrom={x:e.clientX,y:e.clientY},this.isDragging=!0}onDragProgress(e){e.preventDefault();
                const{clientX:t,clientY:s}=e,n={x:t,y:s},o=w(this.center,n),a=w(this.center,this.draggingFrom),l=R(a,o);this.setAngle(this.angle-l),
                this.draggingFrom={...n},this.setState()}onDragEnd(){document.body.removeEventListener("pointermove",this.onDragProgress),
                document.body.removeEventListener("pointerup",this.onDragEnd),this.isDragging=!1,this.playbackSpeed=1,
                this.callbacks.onDragEnded(this.secondsPlayed)}autoRotate(e){const t=e-this.timestampPrevious;let s=b*t*this.playbackSpeed;s+=.1,s=y(s,0,b*t),
                    this.setAngle(this.angle+s)}setState(){this.el.style.transform=`rotate(${this.angle}rad)`}setAngle(e){return this.angle=y(e,0,this.maxAngle),
                        this.angle}start(){this.timestampPrevious=performance.now(),this.loop()}stop(){cancelAnimationFrame(this.rafId),
                            this.callbacks.onStop()}rewind(){this.setAngle(0)}loop(){const e=performance.now();
                                this.isDragging||this.autoRotate(e);
                                const t=e-this.timestampPrevious,
                                s=this.angle-this.anglePrevious,n=b*t;this.playbackSpeed=s/n||0,this.isReversed=this.angle<this.anglePrevious,
                                this.anglePrevious=this.angle,this.timestampPrevious=performance.now(),this.setState();const{playbackSpeed:o,isReversed:a,
                                    secondsPlayed:l,duration:g}=this,p=l/g;this.callbacks.onLoop({playbackSpeed:o,isReversed:a,secondsPlayed:l,progress:p}),
                                    this.anglePrevious=this.angle,this.rafId=requestAnimationFrame(this.loop)}}class T{constructor()
                                        {this.audioContext=new AudioContext,this.gainNode=this.audioContext.createGain(),
                                            this.audioBuffer=null,this.audioBufferReversed=null,this.audioSource=null,this.duration=0,this.speedPrevious=0,
                                            this.isReversed=!1,this.gainNode.connect(this.audioContext.destination)}
                                            async getArrayBufferFromUrl(e){return await(await fetch(e)).arrayBuffer()}
                                            async getAudioBuffer(e){const t=await this.getArrayBufferFromUrl(e);
                                                return await this.audioContext.decodeAudioData(t)}async loadTrack(e)
                                                {this.audioBuffer=await this.getAudioBuffer(e),
                                                    this.audioBufferReversed=this.getReversedAudioBuffer(this.audioBuffer),
                                                    this.duration=this.audioBuffer.duration}getReversedAudioBuffer(e)
                                                    {const t=e.getChannelData(0).slice().reverse(),
                                                        s=this.audioContext.createBuffer(1,e.length,e.sampleRate);
                                                        return s.getChannelData(0).set(t),s}changeDirection(e,t)
                                                        {this.isReversed=e,this.play(t)}play(e=0){this.pause();
                                                            const t=this.isReversed?this.audioBufferReversed:this.audioBuffer,
                                                            s=this.isReversed?this.duration-e:e;this.audioSource=this.audioContext.createBufferSource(),
                                                            this.audioSource.buffer=t,this.audioSource.loop=!1,this.audioSource.connect(this.gainNode),
                                                            this.audioSource.start(0,s)}updateSpeed(e,t,s){if(!this.audioSource)return;
                                                                t!==this.isReversed&&this.changeDirection(t,s);
                                                                const{currentTime:n}=this.audioContext,o=Math.abs(e);
                                                                this.audioSource.playbackRate.cancelScheduledValues(n),
                                                                this.audioSource.playbackRate.linearRampToValueAtTime(Math.max(.001,o),n)}toggleMute(e){this.gainNode.gain.value=e?0:1}pause(){this.audioSource&&this.audioSource.stop()}}const D=()=>{},k="a";class O{constructor({toggleButton:e,rewindButton:t}){this.toggleButton=e,this.rewindButton=t,this.isPlaying=!1,this.isDisabled=!0,this.toggleButton.addEventListener("click",s=>this.toggle(s)),this.rewindButton.addEventListener("click",s=>this.rewind(s)),document.body.addEventListener("keydown",s=>this.onKeyDown(s)),document.body.addEventListener("keyup",s=>this.onKeyUp(s)),this.callbacks={onIsplayingChanged:D,onRewind:D,onToggleMuted:D}}set label(e){this.toggleButton.textContent=e}set isDisabled(e){this.toggleButton.disabled=e}onKeyDown({key:e,repeat:t}){t||e!==k||this.callbacks.onToggleMuted(!0)}onKeyUp({key:e}){e===k&&this.callbacks.onToggleMuted(!1)}toggle(){this.isPlaying=!this.isPlaying,this.toggleButton.classList.toggle("is-active",this.isPlaying),this.callbacks.onIsplayingChanged(this.isPlaying)}rewind(){this.callbacks.onRewind()}}const r=new x(document.querySelector("#disc")),c=new T,d=new O({toggleButton:document.querySelector("#playToggle"),rewindButton:document.querySelector("#rewind")}),
I=async()=>{await c.loadTrack("https://tables-turn.vercel.app/hold%20you.mp3"),d.isDisabled=!1,r.duration=c.duration,r.callbacks.onStop=()=>c.pause(),
r.callbacks.onDragEnded=()=>{d.isPlaying&&c.play(r.secondsPlayed)},r.callbacks.onLoop=({playbackSpeed:i,isReversed:e,secondsPlayed:t,progress:s})=>{c.updateSpeed(i,e,t)},d.callbacks.onIsplayingChanged=i=>{i?(r.powerOn(),c.play(r.secondsPlayed)):r.powerOff()},d.callbacks.onRewind=()=>{r.rewind()},d.callbacks.onToggleMuted=i=>{c.toggleMute(i)}};I();