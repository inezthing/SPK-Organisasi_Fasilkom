const C=[["C1","Saya sangat menikmati kegiatan merangkul orang lain, mendengarkan keluh kesah anggota tim, dan membuat suasana organisasi tetap harmonis.","PSDM / Internal",0],
["C2","Saya memiliki ketertarikan tinggi pada dunia akademik, senang berbagi ilmu/tutoring, serta antusias memfasilitasi kebutuhan studi mahasiswa.","Akademik",.1],
["C3","Saya tertarik atau memiliki dasar dalam bidang pemrograman, pengembangan website/aplikasi, serta pengelolaan infrastruktur teknologi.","Teknologi",.1],
["C4","Saya terbiasa atau ingin mengasah kemampuan mengoperasikan software desain/editing (Figma, Canva, Adobe) untuk memproduksi konten visual.","Media Kreatif",.1],
["C5","Saya adalah orang yang teliti, menyukai keteraturan dokumen/notulensi, serta terbiasa mengelola persuratan baku secara rapi.","Sekretaris",0],
["C6","Saya percaya diri berbicara di depan umum, mudah beradaptasi, dan antusias menjalin hubungan kerja sama dengan pihak eksternal.","Humas Eksternal",.2],
["C7","Saya tertarik dengan penganggaran dana (budgeting), pengelolaan keuangan, serta pembuatan strategi bisnis atau produk kreatif untuk organisasi.","Keuangan & Bisnis",0],
["C8","Saya memiliki kepedulian tinggi terhadap isu-isu sosial, antusias dalam kegiatan pengabdian masyarakat, dan berani menyuarakan aspirasi.","Sosial Masyarakat",.1],
["C9","Saya merasa nyaman bekerja bersama banyak orang, mampu menyesuaikan diri dalam lingkungan yang beragam, dan tetap berkontribusi dengan baik dalam tim.","Umum",0],
["C10","Saya merasa nyaman berkomunikasi dengan orang yang baru dikenal, mampu membangun hubungan baik, dan menyesuaikan cara berkomunikasi dengan berbagai karakter.","Umum",0],
["C11","Saya mampu bekerja dengan baik dalam kondisi deadline ketat, dapat mengatur waktu dan prioritas, serta tetap bertanggung jawab menyelesaikan tugas.","Umum",0],
["C12","Saya mampu mengerjakan tugas yang membutuhkan ketelitian, memperhatikan detail, serta memastikan pekerjaan akurat sesuai ketentuan.","Umum",0]];
const SEC=[["Kerja sama & relasi",[0,8,9,5]],["Akademik, teknologi & kreativitas",[1,2,3]],["Administrasi, keuangan & ketelitian",[4,6,11]],["Sosial & ketahanan kerja",[7,10]]];
const LB=["Sangat tidak setuju","Tidak setuju","Netral","Setuju","Sangat setuju"];
const D="454355344534,423444534444,334353324455,544443344444,323532334553,434143123344,533335435543,443442344444,443343344444,555454455454,222332322233,534544234444,535453535355,445444444454,444444444444,345512412334,554455453332,543234255433,543343234444,355525455443,534542323445,233432243323,553334243333,444434434444,553255555455,555333433444,455533443434,443331343344,145351232354,433253434355,434233344453,344533333344,434332234343,244344232424,334333344433,445555555555,434533333344";
const MAX=5,f=(x,d=4)=>x.toFixed(d);
let S=C.map(c=>c[3]),P=D.split(",").map((v,i)=>({n:"Testing "+(i+1),v:[...v].map(Number)})),Q=10,ans=Array(12).fill(0),step=-1,adm=0,atab=0,miss=0,ID={n:"",nim:"",jur:""};
function swara(){const avg=C.map((_,j)=>P.reduce((a,r)=>a+r.v[j],0)/P.length);
 const ord=C.map((_,j)=>j).sort((a,b)=>Math.abs(avg[a]-avg[b])>1e-9?avg[b]-avg[a]:a-b);let q=[],k=[];
 ord.forEach((j,p)=>{k[p]=p?1+S[j]:1;q[p]=p?q[p-1]/k[p]:1});const sq=q.reduce((a,b)=>a+b,0),w=Array(12);
 return{rows:ord.map((j,p)=>{w[j]=q[p]/sq;return{j,p,avg:avg[j],k:k[p],q:q[p],w:w[j]}}),w,sq}}
function saw(extra){const{w}=swara(),L=extra?[...P,{n:"Kamu",v:extra,me:1}]:P;
 const R=L.map(a=>({n:a.n,me:a.me,sc:a.v.reduce((t,x,j)=>t+x/MAX*w[j],0)}));
 const s=[...R].sort((x,y)=>y.sc-x.sc);s.forEach((x,p)=>x.rk=p&&Math.abs(x.sc-s[p-1].sc)<1e-12?s[p-1].rk:p+1);return{s,w}}
function render(){document.getElementById("w").className="w"+(adm?" adm":"");
 document.getElementById("ft").innerHTML=adm?`<a onclick="location.hash=''">← Kembali ke kuesioner</a>`:`<a onclick="location.hash='admin'">Mode admin</a>`;
 adm?vAdm():(step<0?vId():step<SEC.length?vForm():vRes())}
function vForm(){const[t,ix]=SEC[step];
 document.getElementById("view").innerHTML=`<h1>Cari Divisi yang Cocok Buat Kamu</h1><p>Bagian ${step+1} dari ${SEC.length} · pilih seberapa setuju kamu dengan tiap pernyataan.</p>
 <div class="pg"><i style="width:${step/SEC.length*100}%"></i></div><div class="card"><h2>${t}</h2>
 ${ix.map(j=>`<div class="q"><p>${C[j][1]}</p><div class="lk">${LB.map((l,v)=>`<label class="${miss&&!ans[j]?"miss":""}"><input type="radio" name="q${j}" ${ans[j]==v+1?"checked":""} onchange="ans[${j}]=${v+1}"><b>${v+1}</b><small>${l}</small></label>`).join("")}</div></div>`).join("")}</div>
 <div class="row">${step>=0?`<button class="btn g" onclick="step--;miss=0;render();scrollTo(0,0)">← Kembali</button>`:"<span></span>"}<button class="btn" onclick="nxt()">${step==SEC.length-1?"Lihat keputusan":"Lanjut →"}</button></div>`}
const E=s=>String(s).replace(/[<>&"]/g,c=>"&#"+c.charCodeAt(0)+";"),gi=i=>document.getElementById(i);
function vId(){document.getElementById("view").innerHTML=`<h1>Cari Divisi yang Cocok Buat Kamu</h1><p>Isi data diri dulu, lalu jawab beberapa pernyataan singkat.</p><div class="card"><label class="l">Nama</label><input class="fi" id="fn" value="${E(ID.n)}"><label class="l">NIM</label><input class="fi" id="fm" inputmode="numeric" value="${E(ID.nim)}"><label class="l">Jurusan</label><select class="fi" id="fj">${["","Teknik Informatika","Sistem Informasi","Sistem Komputer","Diploma Komputer","Lainnya"].map(x=>`<option value="${x}" ${x==ID.jur?"selected":""}>${x||"Pilih jurusan"}</option>`).join("")}</select></div><div class="row"><span></span><button class="btn" onclick="go0()">Mulai →</button></div>`}
function go0(){ID.n=gi("fn").value.trim();ID.nim=gi("fm").value.trim();ID.jur=gi("fj").value;if(!ID.n||!ID.nim||!ID.jur){alert("Nama, NIM, dan jurusan wajib diisi.");return}step=0;render();scrollTo(0,0)}
function nxt(){if(SEC[step][1].some(j=>!ans[j])){miss=1;vForm();alert("Masih ada pertanyaan yang belum diisi.");return}miss=0;step++;render();scrollTo(0,0)}
function vRes(){const{s,w}=saw(ans),me=s.find(x=>x.me);
 const dv=C.slice(0,8).map((c,j)=>({d:c[2],v:ans[j],w:w[j]})).sort((a,b)=>b.v-a.v||b.w-a.w);
 document.getElementById("view").innerHTML=`<h1>Hasil Keputusan</h1><div class="pg"><i style="width:100%"></i></div>
 <div class="card"><p>${E(ID.n)} · ${E(ID.nim)} · ${E(ID.jur)}</p><p style="margin:0">Divisi yang paling cocok buat kamu</p>
 <div class="big">${dv[0].d}</div>
 <p>Berdasarkan jawabanmu, minat terkuatmu ada di divisi ini. Pilihan berikutnya: ${dv[1].d} dan ${dv[2].d}.</p>
 <div class="sum"><div><b>${f(me.sc,3)}</b><span>Skor akhir (SAW)</span></div></div></div>
 <div class="card"><h2>Kecocokan dengan tiap divisi</h2>${dv.map(x=>`<div class="dv"><span class="t">${x.d}</span><span class="bar"><i style="width:${x.v/MAX*100}%"></i></span><b>${x.v}/5</b></div>`).join("")}</div>
 <div class="row"><button class="btn g" onclick="ans=Array(12).fill(0);ID={n:'',nim:'',jur:''};step=-1;render();scrollTo(0,0)">Isi ulang</button></div>`}
function vAdm(){const T=["Bobot SWARA","Data testing","Hasil ranking data testing"];
 const tb=`<h1>Mode Admin</h1><p>Atur bobot dan data pembanding (testing). Skor peserta dihitung terhadap data testing ini.</p><div class="tabs">${T.map((t,i)=>`<button class="${i==atab?"on":""}" onclick="atab=${i};render()">${t}</button>`).join("")}</div>`;
 let b="";
 if(atab==0){const{rows,sq}=swara();b=`<div class="card"><p>Urutan dari rata-rata skor data testing. <code>k=s+1</code>, <code>q=q(j−1)÷k</code>, <code>w=q÷Σq</code>.</p><div class="sc"><table><tr><th>#</th><th>Kode</th><th>Divisi</th><th class="n">Rata-rata</th><th class="n">s(j)</th><th class="n">k</th><th class="n">q</th><th class="n">w</th></tr>
 ${rows.map(r=>`<tr><td>${r.p+1}</td><td>${C[r.j][0]}</td><td>${C[r.j][2]}</td><td class="n">${f(r.avg)}</td><td class="n">${r.p?`<input class="s" type="number" step="0.05" min="0" value="${S[r.j]}" onchange="S[${r.j}]=Math.max(0,+this.value||0);render()">`:"–"}</td><td class="n">${f(r.k,2)}</td><td class="n">${f(r.q)}</td><td class="n"><b>${f(r.w)}</b></td></tr>`).join("")}
 <tr><th colspan="6" class="n">Total</th><th class="n">${f(sq)}</th><th class="n">1.0000</th></tr></table></div></div>`}
 if(atab==1)b=`<div class="card"><div class="row" style="justify-content:flex-start;margin:0 0 10px"><button class="btn g" onclick="P.push({n:'Testing '+(P.length+1),v:Array(12).fill(3)});render()">+ Tambah</button></div><div class="sc"><table><tr><th>Nama</th>${C.map(c=>`<th class="n">${c[0]}</th>`).join("")}<th></th></tr>
 ${P.map((a,i)=>`<tr><td><input class="nm" value="${a.n}" oninput="P[${i}].n=this.value"></td>${a.v.map((x,j)=>`<td><input class="v" type="number" min="1" max="5" value="${x}" oninput="P[${i}].v[${j}]=Math.min(5,Math.max(1,+this.value||1))"></td>`).join("")}<td><button class="btn g" onclick="P.splice(${i},1);render()">×</button></td></tr>`).join("")}</table></div></div>`;
 if(atab==2){const{s}=saw();b=`<div class="card"><div class="sc"><table><tr><th>Rank</th><th>Nama</th><th class="n">Skor V</th></tr>
 ${s.map(x=>`<tr><td><b>${x.rk}</b></td><td>${x.n}</td><td class="n">${f(x.sc)}</td></tr>`).join("")}</table></div></div>`}
 document.getElementById("view").innerHTML=tb+b}
function hs(){adm=location.hash=="#admin"?1:0;render()}
addEventListener("hashchange",hs);hs();
