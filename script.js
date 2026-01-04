const api = "http://localhost:3000";

function login(){
 let email = document.getElementById("email").value;
 fetch(api+"/students").then(r=>r.json()).then(d=>{
 let u=d.find(x=>x.email==email);
 if(!u) return alert("Utente non trovato");
 localStorage.setItem("student",JSON.stringify(u));
 window.location="dashboard.html";
 });
}

function registra(){
 fetch(api+"/students",{
 method:"POST",
 headers:{ "Content-Type":"application/json" },
 body:JSON.stringify({
 nome:nome.value,
 cognome:cognome.value,
 email:email.value
 })
 }).then(r=>r.json()).then(s=>{
 localStorage.setItem("student",JSON.stringify(s));
 window.location="dashboard.html";
 });
}

// Corsi
if(location.pathname.includes("courses")){
 let s = JSON.parse(localStorage.getItem("student"));
 fetch(api+"/courses").then(r=>r.json()).then(c=>{
 let d=document.getElementById("corsilist");
 c.forEach(k=>{
 let div=document.createElement("div");
 div.className="card";
 div.innerHTML=k.titolo;
 let b=document.createElement("button");
 b.innerHTML="Iscriviti";
 b.onclick=()=>enroll(k.id);
 div.appendChild(b);
 d.appendChild(div);
 });
 });
}

function enroll(id){
 let s=JSON.parse(localStorage.getItem("student"));
 fetch(api+"/students/"+s.id+"/enroll",{
 method:"POST",
 headers:{ "Content-Type":"application/json" },
 body:JSON.stringify({courseId:id})
 }).then(()=>{
 alert("Iscritto!");
 window.location="course.html";
 });
}

// Profilo
function salva(){
 let s=JSON.parse(localStorage.getItem("student"));
 fetch(api+"/students/"+s.id,{
 method:"PUT",
 headers:{ "Content-Type":"application/json" },
 body:JSON.stringify({
 nome:nome.value,
 cognome:cognome.value,
 email:s.email
 })
 }).then(()=>alert("Aggiornato"));
}