(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{144:function(e,t){},146:function(e,t){},160:function(e,t,n){},161:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),i=n(9),r=n.n(i),s=n(21),o=n(211),l=n(55),d=n(198),j=n(162),u=n(195),b=n(12),O=n(95),m=n(62),p=n.n(m),f=n.p+"static/media/notification.9287f5ce.mp3",x=n.p+"static/media/ringtone.874bbc36.mp3",g=n(5),h=Object(a.createContext)(),v=function(e){var t=e.children,n=Object(a.useState)(),c=Object(b.a)(n,2),i=c[0],r=c[1],s=Object(a.useState)(),o=Object(b.a)(s,2),l=o[0],d=o[1],j=Object(a.useState)(""),u=Object(b.a)(j,2),m=u[0],v=u[1],w=Object(a.useState)(!1),C=Object(b.a)(w,2),y=C[0],N=C[1],k=Object(a.useState)(""),S=Object(b.a)(k,2),I=S[0],E=S[1],R=Object(a.useState)(""),A=Object(b.a)(R,2),D=A[0],L=A[1],P=Object(a.useState)({}),U=Object(b.a)(P,2),V=U[0],B=U[1],M=Object(a.useState)([]),H=Object(b.a)(M,2),_=H[0],T=H[1],W=Object(a.useState)(!1),Z=Object(b.a)(W,2),z=Z[0],G=Z[1],J=Object(a.useState)(!1),q=Object(b.a)(J,2),F=q[0],K=q[1],Q=function(){var e=Object(a.useState)(),t=Object(b.a)(e,2),n=t[0],c=t[1],i=Object(a.useState)(!1),r=Object(b.a)(i,2),s=r[0],o=r[1];return Object(a.useEffect)((function(){n&&(s?n.play():n.pause())}),[s,n]),Object(a.useEffect)((function(){if(n)return n.addEventListener("ended",(function(){return o(!1)})),function(){n.removeEventListener("ended",(function(){return o(!1)}))}}),[n]),[function(e,t){"call"===t&&c(new Audio(x)),"sms"===t&&c(new Audio(f)),o(e)}]}(),X=Object(b.a)(Q,1)[0],Y=Object(a.useRef)(),$=Object(a.useRef)(),ee=Object(a.useRef)();return Object(g.jsx)(h.Provider,{value:{call:V,callAccepted:z,myVideo:Y,userVideo:$,stream:i,name:I,setName:E,callEnded:F,me:m,usersList:_,loggedIn:y,otherName:D,login:function(e){var t=Object(O.io)("/",{query:{name:e}});d(t),sessionStorage.setItem("HPINGER_ZOOM_USERNAME",e),E(e),N(!0),navigator.mediaDevices.getUserMedia({video:!0,audio:!0}).then((function(e){r(e),Y.current.srcObject=e})).catch((function(e){console.log("error in getting permissions: ")})),t.on("me",(function(e){v(e)})),t.on("call-user",(function(e){var t=e.from,n=e.name,a=e.signal;B({isReceivedCall:!0,from:t,name:n,signal:a}),X(!0,"call")})),t.on("users-list",(function(t){T(t.users.filter((function(t){return t!==e})))})),t.on("call-reject",(function(){B({}),X(!1)})),t.on("call-ended",(function(){window.location.reload()})),t.on("new-user",(function(){X(!0,"sms")}))},callUser:function(e){K(!1);var t=new p.a({initiator:!0,trickle:!1,stream:i});t.on("signal",(function(t){l.emit("call-user",{userToCall:e,signalData:t,from:m,name:I}),L(e)})),t.on("stream",(function(e){$.current.srcObject=e})),l.on("call-accepted",(function(e){G(!0),t.signal(e)})),ee.current=t},leaveCall:function(){l.emit("call-ended",D),window.location.reload()},answerCall:function(){G(!0),X(!1);var e=new p.a({initiator:!1,trickle:!1,stream:i});e.on("signal",(function(e){l.emit("answer-call",{signal:e,to:V.from}),L(V.name)})),e.on("stream",(function(e){$.current.srcObject=e})),e.signal(V.signal),ee.current=e}},children:t})},w=Object(u.a)((function(e){return{video:Object(s.a)({width:"550px"},e.breakpoints.down("xs"),{width:"300px"}),gridContainer:Object(s.a)({justifyContent:"center"},e.breakpoints.down("xs"),{flexDirection:"column"}),paper:{padding:"10px",border:"2px solid black",margin:"10px"}}})),C=function(){var e=Object(a.useContext)(h),t=e.name,n=e.callAccepted,c=e.myVideo,i=e.userVideo,r=e.callEnded,s=e.stream,o=(e.call,e.otherName),u=w();return Object(g.jsxs)(d.a,{container:!0,className:u.gridContainer,children:[s&&Object(g.jsx)(j.a,{className:u.paper,children:Object(g.jsxs)(d.a,{item:!0,xs:12,md:6,children:[Object(g.jsxs)(l.a,{variant:"h5",gutterBottom:!0,children:[" ",t||"Name"]}),Object(g.jsx)("video",{playsInline:!0,muted:!0,ref:c,autoPlay:!0,className:u.video,id:"myVideo"})]})}),n&&!r&&Object(g.jsx)(j.a,{className:u.paper,children:Object(g.jsxs)(d.a,{item:!0,xs:12,md:6,children:[Object(g.jsxs)(l.a,{variant:"h5",gutterBottom:!0,children:["  ",o||"Name"]}),Object(g.jsx)("video",{playsInline:!0,ref:i,autoPlay:!0,className:u.video})]})})]})},y=n(200),N=n(201),k=function(){var e=Object(a.useContext)(h),t=e.answerCall,n=e.call,c=e.callAccepted,i=e.leaveCall,r=e.callEnded;return Object(g.jsxs)(g.Fragment,{children:[n.isReceivedCall&&!c&&Object(g.jsxs)("div",{style:{display:"flex",justifyContent:"center"},children:[Object(g.jsxs)("h1",{children:[n.name," is calling: "]}),Object(g.jsx)(y.a,{variant:"contained",color:"primary",onClick:t,children:"Answer"}),Object(g.jsx)(y.a,{variant:"contained",color:"secondary",onClick:i,children:"Reject"})]}),c&&!r&&Object(g.jsx)(y.a,{variant:"contained",color:"secondary",startIcon:Object(g.jsx)(N.a,{fontSize:"large"}),fullWidth:!0,onClick:i,style:{marginTop:"20px"},children:"Hang Up"})]})},S=n(209),I=n(212),E=n(210),R=n(101),A=n(202),D=n(203),L=n(204),P=n(207),U=n(206),V=n(213),B=n(205),M=n(208),H=Object(u.a)((function(e){return{root:Object(s.a)({width:"100%",backgroundColor:e.palette.background.paper,justifyContent:"center"},e.breakpoints.down("xs"),{width:"100%"}),span:{width:"100%",backgroundColor:e.palette.background.paper}}}));function _(){var e=H(),t=c.a.useState([]),n=Object(b.a)(t,2),i=n[0],r=n[1],s=Object(a.useContext)(h),o=s.usersList,l=s.callUser,d=s.loggedIn;return Object(g.jsxs)(A.a,{className:e.root,children:[o.map((function(e,t){var n,a="checkbox-list-label-".concat(t);return Object(g.jsxs)(D.a,{role:void 0,dense:!0,button:!0,onClick:(n=t,function(){var e=i.indexOf(n),t=Object(R.a)(i);-1===e?t.push(n):t.splice(e,1),r(t)}),children:[Object(g.jsx)(L.a,{children:Object(g.jsx)(V.a,{edge:"start",checked:-1!==i.indexOf(t),tabIndex:-1,disableRipple:!0,inputProps:{"aria-labelledby":a}})}),Object(g.jsx)(U.a,{id:e,primary:"".concat(e)}),Object(g.jsx)(P.a,{children:Object(g.jsx)(B.a,{edge:"end","aria-label":"comments",onClick:function(){return l(e)},children:Object(g.jsx)(M.a,{})})})]},t)})),d&&0===o.length&&Object(g.jsx)("span",{className:e.span,children:"Nobody is Online"})]})}var T=Object(u.a)((function(e){return{root:{display:"flex",flexDirection:"column"},gridContainer:Object(s.a)({width:"100%"},e.breakpoints.down("xs"),{flexDirection:"column"}),container:Object(s.a)({width:"600px",margin:"35px 0",padding:0},e.breakpoints.down("xs"),{width:"90%"}),margin:{marginTop:20,type:"submit"},padding:{padding:20},paper:{padding:"10px 20px",border:"2px solid black"}}})),W=function(e){var t=e.children,n=Object(a.useContext)(h),c=n.name,i=n.setName,r=n.login,s=n.usersList,o=n.loggedIn,u=T();return Object(a.useEffect)((function(){var e=sessionStorage.getItem("HPINGER_ZOOM_USERNAME");e&&r(e)}),[]),Object(g.jsx)(S.a,{className:u.container,children:Object(g.jsxs)(j.a,{elevation:10,className:u.paper,children:[Object(g.jsx)("form",{className:u.root,noValidate:!0,autoComplete:"off",onSubmit:function(e){e.preventDefault(),r(c)},children:Object(g.jsxs)(d.a,{container:!0,className:u.gridContainer,children:[Object(g.jsxs)(d.a,{item:!0,xs:12,md:12,className:u.padding,children:[Object(g.jsxs)(l.a,{variant:"h6",children:[" Account Info : ",c]}),!o&&Object(g.jsx)(I.a,{label:"Name",value:c,onChange:function(e){return i(e.target.value)},fullWidth:!0}),!o&&Object(g.jsx)(y.a,{variant:"contained",color:"primary",startIcon:Object(g.jsx)(E.a,{fontSize:"large"}),fullWidth:!0,onClick:function(){return r(c)},className:u.margin,children:"Login"})]}),Object(g.jsx)(_,{usersList:s})]})}),t]})})},Z=Object(u.a)((function(e){return{appBar:Object(s.a)({borderRadius:15,margin:"30px 100px",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"600px",border:"2px solid black"},e.breakpoints.down("xs"),{width:"90%"}),image:{marginLeft:"15px"},wrapper:{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}})),z=function(){var e=Z();return Object(g.jsxs)("div",{className:e.wrapper,children:[Object(g.jsx)(o.a,{position:"static",color:"inherit",className:e.appBar,children:Object(g.jsx)(l.a,{variant:"h2",align:"center",children:"Hpinger Zoom"})}),Object(g.jsx)(C,{}),Object(g.jsx)(W,{children:Object(g.jsx)(k,{})})]})};n(160);r.a.render(Object(g.jsx)(v,{children:Object(g.jsx)(z,{})}),document.getElementById("root"))}},[[161,1,2]]]);
//# sourceMappingURL=main.5df0c0f4.chunk.js.map