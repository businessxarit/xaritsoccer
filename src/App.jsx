import { useState, useEffect, useRef, useCallback } from "react";

const LOGO_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAEAAElEQVR42oy9d5..."; // garde ton logo

// ═══════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════
const GROUPS = {
  A:[{name:"Mexico",flag:"🇲🇽",p:1,w:1,d:0,l:0,gf:2,ga:0,pts:3},{name:"South Korea",flag:"🇰🇷",p:2,w:2,d:0,l:0,gf:4,ga:1,pts:6},{name:"Czech Rep.",flag:"🇨🇿",p:2,w:0,d:0,l:2,gf:1,ga:4,pts:0},{name:"South Africa",flag:"🇿🇦",p:1,w:0,d:0,l:1,gf:0,ga:2,pts:0}],
  B:[{name:"Canada",flag:"🇨🇦",p:1,w:0,d:1,l:0,gf:1,ga:1,pts:1},{name:"Bosnia-Herz.",flag:"🇧🇦",p:1,w:0,d:1,l:0,gf:1,ga:1,pts:1},{name:"Qatar",flag:"🇶🇦",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Switzerland",flag:"🇨🇭",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}],
  C:[{name:"Brazil",flag:"🇧🇷",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Morocco",flag:"🇲🇦",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Scotland",flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Haiti",flag:"🇭🇹",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}],
  D:[{name:"USA",flag:"🇺🇸",p:1,w:1,d:0,l:0,gf:4,ga:1,pts:3},{name:"Australia",flag:"🇦🇺",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Turkey",flag:"🇹🇷",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Paraguay",flag:"🇵🇾",p:1,w:0,d:0,l:1,gf:1,ga:4,pts:0}],
  E:[{name:"Germany",flag:"🇩🇪",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Ecuador",flag:"🇪🇨",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Ivory Coast",flag:"🇨🇮",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Curaçao",flag:"🇨🇼",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}],
  F:[{name:"Netherlands",flag:"🇳🇱",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Japan",flag:"🇯🇵",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Tunisia",flag:"🇹🇳",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Sweden",flag:"🇸🇪",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}],
  G:[{name:"Belgium",flag:"🇧🇪",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Iran",flag:"🇮🇷",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Egypt",flag:"🇪🇬",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"New Zealand",flag:"🇳🇿",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}],
  H:[{name:"Spain",flag:"🇪🇸",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Uruguay",flag:"🇺🇾",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Saudi Arabia",flag:"🇸🇦",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Cape Verde",flag:"🇨🇻",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}],
  I:[{name:"France",flag:"🇫🇷",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Senegal",flag:"🇸🇳",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Norway",flag:"🇳🇴",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Iraq",flag:"🇮🇶",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}],
  J:[{name:"Argentina",flag:"🇦🇷",p:1,w:1,d:0,l:0,gf:3,ga:0,pts:3},{name:"Austria",flag:"🇦🇹",p:1,w:1,d:0,l:0,gf:3,ga:1,pts:3},{name:"Algeria",flag:"🇩🇿",p:1,w:0,d:0,l:1,gf:0,ga:3,pts:0},{name:"Jordan",flag:"🇯🇴",p:1,w:0,d:0,l:1,gf:1,ga:3,pts:0}],
  K:[{name:"Portugal",flag:"🇵🇹",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Colombia",flag:"🇨🇴",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Uzbekistan",flag:"🇺🇿",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"DR Congo",flag:"🇨🇩",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}],
  L:[{name:"England",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Croatia",flag:"🇭🇷",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Panama",flag:"🇵🇦",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Ghana",flag:"🇬🇭",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}],
};

const MATCHES = [
  {id:"m01",date:"Jun 11",day:11,time:"21:00",group:"A",home:"Mexico",hf:"🇲🇽",away:"South Africa",af:"🇿🇦",stadium:"Estadio Azteca",city:"Mexico City",status:"finished",hs:2,as:0,events:[{type:"goal",team:"home",player:"J. Quiñones",min:9},{type:"goal",team:"home",player:"R. Jiménez",min:52}]},
  {id:"m02",date:"Jun 12",day:12,time:"20:00",group:"A",home:"South Korea",hf:"🇰🇷",away:"Czech Rep.",af:"🇨🇿",stadium:"Estadio Akron",city:"Guadalajara",status:"finished",hs:2,as:1,events:[{type:"goal",team:"home",player:"H. Son",min:23},{type:"goal",team:"away",player:"P. Schick",min:56},{type:"goal",team:"home",player:"H. Son",min:78}]},
  {id:"m03",date:"Jun 12",day:12,time:"23:00",group:"B",home:"Canada",hf:"🇨🇦",away:"Bosnia-Herz.",af:"🇧🇦",stadium:"BC Place",city:"Vancouver",status:"finished",hs:1,as:1,events:[{type:"goal",team:"home",player:"A. Davies",min:34},{type:"goal",team:"away",player:"E. Dzeko",min:67}]},
  {id:"m04",date:"Jun 13",day:13,time:"02:00",group:"D",home:"USA",hf:"🇺🇸",away:"Paraguay",af:"🇵🇾",stadium:"MetLife Stadium",city:"New York",status:"finished",hs:4,as:1,events:[{type:"goal",team:"home",player:"F. Balogun",min:14},{type:"goal",team:"home",player:"F. Balogun",min:38},{type:"goal",team:"away",player:"R. Alonso",min:55},{type:"goal",team:"home",player:"C. Pulisic",min:71},{type:"goal",team:"home",player:"T. Weah",min:88}]},
  {id:"m05",date:"Jun 13",day:13,time:"19:00",group:"B",home:"Qatar",hf:"🇶🇦",away:"Switzerland",af:"🇨🇭",stadium:"Levi's Stadium",city:"San Francisco",status:"finished",hs:0,as:2,events:[{type:"goal",team:"away",player:"X. Shaqiri",min:31},{type:"goal",team:"away",player:"B. Embolo",min:74}]},
  {id:"m06",date:"Jun 14",day:14,time:"02:00",group:"C",home:"Brazil",hf:"🇧🇷",away:"Morocco",af:"🇲🇦",stadium:"Rose Bowl",city:"Los Angeles",status:"finished",hs:2,as:0,events:[{type:"goal",team:"home",player:"Vinicius Jr.",min:18},{type:"goal",team:"home",player:"Rodrygo",min:61}]},
  {id:"m07",date:"Jun 14",day:14,time:"19:00",group:"E",home:"Germany",hf:"🇩🇪",away:"Curaçao",af:"🇨🇼",stadium:"Mercedes-Benz Stadium",city:"Atlanta",status:"finished",hs:4,as:0,events:[{type:"goal",team:"home",player:"T. Müller",min:12},{type:"goal",team:"home",player:"K. Havertz",min:34},{type:"goal",team:"home",player:"L. Goretzka",min:56},{type:"goal",team:"home",player:"J. Kimmich",min:78}]},
  {id:"m08",date:"Jun 14",day:14,time:"22:00",group:"F",home:"Netherlands",hf:"🇳🇱",away:"Japan",af:"🇯🇵",stadium:"Hard Rock Stadium",city:"Miami",status:"finished",hs:2,as:1,events:[{type:"goal",team:"home",player:"M. Depay",min:23},{type:"goal",team:"away",player:"D. Ito",min:55},{type:"goal",team:"home",player:"C. Gakpo",min:82}]},
  {id:"m09",date:"Jun 15",day:15,time:"18:00",group:"H",home:"Spain",hf:"🇪🇸",away:"Cape Verde",af:"🇨🇻",stadium:"Gillette Stadium",city:"Boston",status:"finished",hs:3,as:0,events:[{type:"goal",team:"home",player:"L. Yamal",min:15},{type:"goal",team:"home",player:"Pedri",min:44},{type:"goal",team:"home",player:"A. Morata",min:71}]},
  {id:"m10",date:"Jun 15",day:15,time:"21:00",group:"G",home:"Belgium",hf:"🇧🇪",away:"Egypt",af:"🇪🇬",stadium:"Lincoln Financial Field",city:"Philadelphia",status:"finished",hs:2,as:0,events:[{type:"goal",team:"home",player:"R. Lukaku",min:28},{type:"goal",team:"home",player:"K. De Bruyne",min:65}]},
  {id:"m11",date:"Jun 16",day:16,time:"21:00",group:"I",home:"France",hf:"🇫🇷",away:"Senegal",af:"🇸🇳",stadium:"MetLife Stadium",city:"New York",status:"finished",hs:1,as:1,events:[{type:"goal",team:"home",player:"K. Mbappé",min:34},{type:"goal",team:"away",player:"S. Mané",min:78}],isSenegal:true},
  {id:"m12",date:"Jun 17",day:17,time:"00:00",group:"I",home:"Iraq",hf:"🇮🇶",away:"Norway",af:"🇳🇴",stadium:"Gillette Stadium",city:"Boston",status:"finished",hs:0,as:2,events:[{type:"goal",team:"away",player:"E. Haaland",min:23},{type:"goal",team:"away",player:"M. Ødegaard",min:67}]},
  {id:"m13",date:"Jun 17",day:17,time:"03:00",group:"J",home:"Argentina",hf:"🇦🇷",away:"Algeria",af:"🇩🇿",stadium:"MetLife Stadium",city:"New York",status:"finished",hs:3,as:0,events:[{type:"goal",team:"home",player:"L. Messi",min:17},{type:"goal",team:"home",player:"L. Messi",min:60},{type:"goal",team:"home",player:"L. Messi",min:76}]},
  {id:"m14",date:"Jun 17",day:17,time:"19:00",group:"K",home:"Portugal",hf:"🇵🇹",away:"DR Congo",af:"🇨🇩",stadium:"AT&T Stadium",city:"Dallas",status:"live",hs:1,as:1,minute:67,events:[{type:"goal",team:"home",player:"C. Ronaldo",min:23},{type:"goal",team:"away",player:"B. Mayele",min:55}]},
  {id:"m15",date:"Jun 17",day:17,time:"22:00",group:"L",home:"England",hf:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",away:"Croatia",af:"🇭🇷",stadium:"Rose Bowl",city:"Los Angeles",status:"upcoming"},
  {id:"m16",date:"Jun 17",day:17,time:"23:00",group:"L",home:"Ghana",hf:"🇬🇭",away:"Panama",af:"🇵🇦",stadium:"SoFi Stadium",city:"Los Angeles",status:"upcoming"},
  {id:"m17",date:"Jun 23",day:23,time:"02:00",group:"I",home:"Norway",hf:"🇳🇴",away:"Senegal",af:"🇸🇳",stadium:"AT&T Stadium",city:"Dallas",status:"upcoming",isSenegal:true},
  {id:"m18",date:"Jun 26",day:26,time:"21:00",group:"I",home:"Senegal",hf:"🇸🇳",away:"Iraq",af:"🇮🇶",stadium:"SoFi Stadium",city:"Los Angeles",status:"upcoming",isSenegal:true},
];

const VENUES = [
  {name:"MetLife Stadium",city:"New York",cap:"82,500",flag:"🇺🇸",host:"Finale",matches:8},
  {name:"Rose Bowl",city:"Los Angeles",cap:"87,519",flag:"🇺🇸",host:"3e place",matches:7},
  {name:"Estadio Azteca",city:"Mexico City",cap:"87,500",flag:"🇲🇽",host:"Match ouverture",matches:5},
  {name:"AT&T Stadium",city:"Dallas",cap:"80,000",flag:"🇺🇸",host:"",matches:6},
  {name:"SoFi Stadium",city:"Los Angeles",cap:"70,240",flag:"🇺🇸",host:"",matches:6},
  {name:"Hard Rock Stadium",city:"Miami",cap:"65,326",flag:"🇺🇸",host:"",matches:5},
  {name:"Levi's Stadium",city:"San Francisco",cap:"68,500",flag:"🇺🇸",host:"",matches:5},
  {name:"Gillette Stadium",city:"Boston",cap:"65,878",flag:"🇺🇸",host:"",matches:5},
  {name:"Mercedes-Benz Stadium",city:"Atlanta",cap:"71,000",flag:"🇺🇸",host:"",matches:5},
  {name:"Lincoln Financial Field",city:"Philadelphia",cap:"69,796",flag:"🇺🇸",host:"",matches:5},
  {name:"Estadio Akron",city:"Guadalajara",cap:"49,850",flag:"🇲🇽",host:"",matches:5},
  {name:"BC Place",city:"Vancouver",cap:"54,500",flag:"🇨🇦",host:"",matches:5},
];

const PLAYERS = [
  {id:"p1",name:"Kylian Mbappé",pos:"Attaquant",age:27,club:"Real Madrid",country:"France",flag:"🇫🇷",num:10,h:"178cm",w:"73kg",foot:"Droit",goals:1,assists:0,matches:1,shots:4,bio:"Capitaine des Bleus. Meilleur buteur de l'histoire de l'équipe de France.",career:[{year:"2018",event:"Champion du Monde 🏆",goals:3},{year:"2022",event:"Vice-champion (8 buts)",goals:8},{year:"2024",event:"Rejoint le Real Madrid",goals:35}],wc:{apps:2,goals:12,assists:4}},
  {id:"p2",name:"Vinicius Jr.",pos:"Ailier",age:24,club:"Real Madrid",country:"Brazil",flag:"🇧🇷",num:7,h:"176cm",w:"73kg",foot:"Droit",goals:1,assists:0,matches:1,shots:3,bio:"Ballon d'Or 2024. Ailier dévastateur du Real Madrid.",career:[{year:"2022",event:"Vainqueur Ligue des Champions",goals:22},{year:"2024",event:"Ballon d'Or",goals:24}],wc:{apps:1,goals:1,assists:2}},
  {id:"p3",name:"Erling Haaland",pos:"Avant-centre",age:25,club:"Man City",country:"Norway",flag:"🇳🇴",num:9,h:"194cm",w:"88kg",foot:"Gauche",goals:1,assists:0,matches:1,shots:5,bio:"Machine à buts. 1ère Coupe du Monde pour Haaland et la Norvège.",career:[{year:"2023",event:"Triplé historique Man City",goals:52},{year:"2024",event:"Meilleur buteur PL",goals:27}],wc:{apps:0,goals:0,assists:0}},
  {id:"p4",name:"Sadio Mané",pos:"Attaquant",age:34,club:"Al-Nassr",country:"Senegal",flag:"🇸🇳",num:10,h:"175cm",w:"69kg",foot:"Droit",goals:1,assists:0,matches:1,shots:3,bio:"Légende du Sénégal. Champion d'Afrique 2022.",career:[{year:"2019",event:"Vainqueur LDC Liverpool",goals:26},{year:"2022",event:"Champion d'Afrique 🦁",goals:16}],wc:{apps:2,goals:3,assists:2}},
  {id:"p5",name:"Lionel Messi",pos:"Attaquant",age:37,club:"Inter Miami",country:"Argentina",flag:"🇦🇷",num:10,h:"170cm",w:"67kg",foot:"Gauche",goals:3,assists:0,matches:1,shots:6,bio:"GOAT. Champion du Monde 2022. Hat-trick contre l'Algérie.",career:[{year:"2022",event:"Champion du Monde 🏆",goals:7},{year:"2024",event:"Copa América",goals:8}],wc:{apps:5,goals:13,assists:8}},
  {id:"p6",name:"Jude Bellingham",pos:"Milieu",age:22,club:"Real Madrid",country:"England",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",num:5,h:"186cm",w:"75kg",foot:"Droit",goals:0,assists:0,matches:0,shots:0,bio:"Milieu complet. Leader de l'Angleterre et du Real à 22 ans.",career:[{year:"2023",event:"Champion d'Espagne",goals:23},{year:"2024",event:"Finaliste Euro",goals:18}],wc:{apps:1,goals:3,assists:2}},
  {id:"p7",name:"Ismaïla Sarr",pos:"Ailier",age:26,club:"Crystal Palace",country:"Senegal",flag:"🇸🇳",num:7,h:"183cm",w:"75kg",foot:"Droit",goals:0,assists:1,matches:1,shots:2,bio:"Ailier explosif des Lions. Vitesse et dribbles dévastateurs.",career:[{year:"2022",event:"Champion d'Afrique 🦁",goals:12}],wc:{apps:1,goals:1,assists:1}},
  {id:"p8",name:"Lamine Yamal",pos:"Ailier",age:18,club:"Barcelona",country:"Spain",flag:"🇪🇸",num:19,h:"180cm",w:"68kg",foot:"Droit",goals:1,assists:0,matches:1,shots:4,bio:"Prodige du Barça. Champion d'Europe 2024 à 17 ans.",career:[{year:"2024",event:"Champion d'Europe à 17 ans 🏆",goals:15}],wc:{apps:0,goals:0,assists:0}},
];

const HISTORY = [
  {year:2022,host:"Qatar 🇶🇦",winner:"Argentina",wf:"🇦🇷",ru:"France",rf:"🇫🇷",final:"Argentine 3-3 France (4-2 TAB)",goals:172,teams:32,att:"3.4",scorers:[{n:"Kylian Mbappé",f:"🇫🇷",g:8,a:2},{n:"Olivier Giroud",f:"🇫🇷",g:4,a:0},{n:"Cody Gakpo",f:"🇳🇱",g:3,a:3}],assisters:[{n:"Lionel Messi",f:"🇦🇷",a:3},{n:"Cody Gakpo",f:"🇳🇱",a:3}],matches:[{r:"Finale",hf:"🇦🇷",h:"Argentine",s:"3-3",af:"🇫🇷",a:"France",d:"4-2 TAB"},{r:"Demi",hf:"🇦🇷",h:"Argentine",s:"3-0",af:"🇭🇷",a:"Croatie",d:""},{r:"Choc",hf:"🇦🇷",h:"Argentine",s:"1-2",af:"🇸🇦",a:"Arabie S.",d:"Surprise !"}]},
  {year:2018,host:"Russia 🇷🇺",winner:"France",wf:"🇫🇷",ru:"Croatia",rf:"🇭🇷",final:"France 4-2 Croatie",goals:169,teams:32,att:"3.0",scorers:[{n:"Harry Kane",f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",g:6,a:0},{n:"Romelu Lukaku",f:"🇧🇪",g:4,a:0},{n:"Antoine Griezmann",f:"🇫🇷",g:3,a:2}],assisters:[{n:"Kevin De Bruyne",f:"🇧🇪",a:3},{n:"Griezmann",f:"🇫🇷",a:2}],matches:[{r:"Finale",hf:"🇫🇷",h:"France",s:"4-2",af:"🇭🇷",a:"Croatie",d:""},{r:"1/8",hf:"🇫🇷",h:"France",s:"4-3",af:"🇦🇷",a:"Argentine",d:"Thriller !"}]},
  {year:2014,host:"Brazil 🇧🇷",winner:"Germany",wf:"🇩🇪",ru:"Argentina",rf:"🇦🇷",final:"Allemagne 1-0 Argentine (AP)",goals:171,teams:32,att:"3.4",scorers:[{n:"James Rodríguez",f:"🇨🇴",g:6,a:2},{n:"Thomas Müller",f:"🇩🇪",g:5,a:3}],assisters:[{n:"Thomas Müller",f:"🇩🇪",a:3}],matches:[{r:"Finale",hf:"🇩🇪",h:"Allemagne",s:"1-0",af:"🇦🇷",a:"Argentine",d:"AP"},{r:"Demi",hf:"🇩🇪",h:"Allemagne",s:"7-1",af:"🇧🇷",a:"Brésil",d:"Mineirazo !"}]},
  {year:2002,host:"S.Korea/Japan",winner:"Brazil",wf:"🇧🇷",ru:"Germany",rf:"🇩🇪",final:"Brésil 2-0 Allemagne",goals:161,teams:32,att:"2.7",scorers:[{n:"Ronaldo",f:"🇧🇷",g:8,a:1}],assisters:[{n:"Rivaldo",f:"🇧🇷",a:3}],matches:[{r:"Finale",hf:"🇧🇷",h:"Brésil",s:"2-0",af:"🇩🇪",a:"Allemagne",d:"Ronaldo ×2"},{r:"🦁 Hist.",hf:"🇸🇳",h:"Sénégal",s:"1-0",af:"🇫🇷",a:"France",d:"1ère CdM SEN !"}]},
  {year:1998,host:"France 🇫🇷",winner:"France",wf:"🇫🇷",ru:"Brazil",rf:"🇧🇷",final:"France 3-0 Brésil",goals:171,teams:32,att:"2.8",scorers:[{n:"Davor Šuker",f:"🇭🇷",g:6,a:0}],assisters:[{n:"Roberto Carlos",f:"🇧🇷",a:4}],matches:[{r:"Finale",hf:"🇫🇷",h:"France",s:"3-0",af:"🇧🇷",a:"Brésil",d:"Zidane ×2"}]},
];

const RECORDS = [
  {v:"5",l:"Plus de titres",h:"Brésil 🇧🇷",d:"1958·1962·1970·1994·2002",i:"🏆"},
  {v:"8",l:"Plus de finales",h:"Allemagne 🇩🇪",d:"4 titres, 4 finales perdues",i:"🥈"},
  {v:"13",l:"Plus de buts (édition)",h:"Just Fontaine 🇫🇷",d:"Suède 1958 — Record imbattable",i:"⚽"},
  {v:"16",l:"Plus de buts (carrière)",h:"Miroslav Klose 🇩🇪",d:"4 éditions",i:"🎯"},
  {v:"17 ans",l:"Plus jeune buteur",h:"Pelé 🇧🇷",d:"Suède 1958, 6 buts",i:"⭐"},
];

const NEWS = [];

// ═══════════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════════
const T = {
  bg:"#0a0e1a", s:"#111827", s2:"#1c2333", s3:"#243044",
  blue:"#1d4ed8", bl:"#3b82f6", live:"#ef4444",
  green:"#22c55e", sen:"#00b359", gold:"#f59e0b",
  white:"#f9fafb", grey:"#9ca3af", g2:"#6b7280", border:"#1f2937",
};

const css = `
*{box-sizing:border-box;margin:0;padding:0;}
::-webkit-scrollbar{display:none;}
body{background:${T.bg};}
button,input,select{font-family:inherit;}
input{font-size:16px!important;}
html{touch-action:manipulation;}
@keyframes lp{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.4;transform:scale(.8);}}
@keyframes fu{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
@keyframes tk{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.fu{animation:fu .25s ease;}
.ld{animation:lp 1.3s ease-in-out infinite;}
`;

// ═══════════════════════════════════════════════════
// ATOMS
// ═══════════════════════════════════════════════════
const Fl = ({f,s=32}) => (
  <div style={{width:s,height:s,borderRadius:"50%",background:T.s2,border:`1.5px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:s*.54,flexShrink:0}}>{f}</div>
);

const Bdg = ({label,color=T.bl}) => (
  <span style={{fontSize:10,fontWeight:800,letterSpacing:.8,color,background:color+"22",border:`1px solid ${color}44`,borderRadius:20,padding:"2px 8px"}}>{label}</span>
);

const SecTitle = ({children,action,onAction}) => (
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
    <span style={{fontSize:14,fontWeight:800,color:T.white}}>{children}</span>
    {action && <span onClick={onAction} style={{fontSize:12,color:T.bl,cursor:"pointer",fontWeight:600}}>{action} →</span>}
  </div>
);

// ═══════════════════════════════════════════════════
// ICONS
// ═══════════════════════════════════════════════════
const IC = {
  home:(a,c)=><svg width="22" height="22" viewBox="0 0 24 24" fill={a?c:"none"} stroke={a?c:"#6b7280"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>,
  ball:(a,c)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?c:"#6b7280"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3c-1.5 4-1.5 14 0 18M12 3c1.5 4 1.5 14 0 18M3.5 9h17M3.5 15h17"/></svg>,
  grid:(a,c)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?c:"#6b7280"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  users:(a,c)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?c:"#6b7280"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="8" r="2.5"/><path d="M21 20c0-2.8-1.8-5-4-5.5"/></svg>,
  book:(a,c)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?c:"#6b7280"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
  stad:(a,c)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?c:"#6b7280"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="10" rx="9" ry="4"/><path d="M3 10v4c0 2.2 4 4 9 4s9-1.8 9-4v-4"/><path d="M3 14v4c0 2.2 4 4 9 4s9-1.8 9-4v-4"/></svg>,
  tgt:(a,c)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?c:"#6b7280"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1" fill={a?c:"#6b7280"}/></svg>,
  srch:(c)=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c||"#6b7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>,
};

// ═══════════════════════════════════════════════════
// LIVE DATA HOOK
// ═══════════════════════════════════════════════════
const API_PROXY = "/api/football";

function useLiveMatches() {
  const [liveData, setLiveData] = useState({});
  const [allMatches, setAllMatches] = useState([]); // liste complète et réelle issue de l'API
  const [standings, setStandings] = useState({});
  const [scorers, setScorers] = useState([]);
  const [apiOnline, setApiOnline] = useState(false);

  const TEAM_MAP = {
    "Senegal":"Senegal","France":"France","Norway":"Norway","Iraq":"Iraq",
    "United States":"USA","Mexico":"Mexico","South Africa":"South Africa",
    "South Korea":"South Korea","Czechia":"Czech Rep.",
    "Bosnia and Herzegovina":"Bosnia-Herz.","Canada":"Canada",
    "Switzerland":"Switzerland","Brazil":"Brazil","Morocco":"Morocco",
    "Scotland":"Scotland","Haiti":"Haiti","Australia":"Australia",
    "Türkiye":"Turkey","Paraguay":"Paraguay","Germany":"Germany",
    "Ecuador":"Ecuador","Ivory Coast":"Ivory Coast","Curaçao":"Curaçao",
    "Netherlands":"Netherlands","Japan":"Japan","Tunisia":"Tunisia",
    "Sweden":"Sweden","Belgium":"Belgium","Iran":"Iran","Egypt":"Egypt",
    "New Zealand":"New Zealand","Spain":"Spain","Uruguay":"Uruguay",
    "Saudi Arabia":"Saudi Arabia","Cape Verde":"Cape Verde",
    "Argentina":"Argentina","Austria":"Austria","Algeria":"Algeria",
    "Jordan":"Jordan","Portugal":"Portugal","Colombia":"Colombia",
    "Uzbekistan":"Uzbekistan","DR Congo":"DR Congo","England":"England",
    "Croatia":"Croatia","Panama":"Panama","Ghana":"Ghana","Qatar":"Qatar",
  };

  const normalize = (name) => TEAM_MAP[name] || name;

  // Helper partagé : trouve le drapeau d'une équipe en cherchant dans tous les groupes
  const findFlag = (teamName) => {
    for (const g of Object.values(GROUPS)) {
      const found = g.find(t => t.name === teamName);
      if (found) return found.flag;
    }
    return "🏳️";
  };

  const fetchAll = useCallback(async () => {
    try {
      const [matchRes, standRes, scorerRes] = await Promise.allSettled([
        fetch(`${API_PROXY}?endpoint=matches`),
        fetch(`${API_PROXY}?endpoint=standings`),
        fetch(`${API_PROXY}?endpoint=scorers`),
      ]);

      if (matchRes.status === "fulfilled" && matchRes.value.ok) {
        const data = await matchRes.value.json();
        const matches = data.matches || [];
        const map = {};
        const fullList = [];

        matches.forEach(m => {
          const home = normalize(m.homeTeam?.name);
          const away = normalize(m.awayTeam?.name);
          const key = `${home}_${away}`;
          const status =
            ["IN_PLAY","PAUSED"].includes(m.status) ? "live"
            : m.status === "FINISHED" ? "finished"
            : "upcoming";
          const hs = m.score?.fullTime?.home ?? m.score?.halfTime?.home ?? null;
          const as = m.score?.fullTime?.away ?? m.score?.halfTime?.away ?? null;
          const minute = m.minute ?? null;

          map[key] = { status, hs, as, minute };

          // football-data.org renvoie "GROUP_A", pas "Group A" — extraction robuste de la lettre
          const groupLetter = (m.group || "").match(/[A-L]$/)?.[0] || "";

          const utcDate = m.utcDate ? new Date(m.utcDate) : null;
          fullList.push({
            id: `api-${m.id}`,
            day: utcDate ? utcDate.getDate() : null,
            date: utcDate ? utcDate.toLocaleDateString("fr-FR",{day:"numeric",month:"short"}) : "",
            // Date ISO complète (avec année) — nécessaire pour interroger API-Football (compositions/événements)
            isoDate: utcDate ? utcDate.toISOString().slice(0,10) : null,
            time: utcDate ? utcDate.toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}) : "",
            group: groupLetter,
            home, away,
            hf: findFlag(home),
            af: findFlag(away),
            stadium: m.venue || "",
            city: "",
            status, hs, as, minute,
            isSenegal: home==="Senegal" || away==="Senegal",
          });
        });

        setLiveData(map);
        if (fullList.length > 0) setAllMatches(fullList);
      }

      if (standRes.status === "fulfilled" && standRes.value.ok) {
        const data = await standRes.value.json();
        const groups = data.standings || [];
        const smap = {};

        groups.forEach(group => {
          const letter = (group.group || "").match(/[A-L]$/)?.[0] || "";
          if (!letter) return;
          smap[letter] = group.table.map(t => {
            const teamName = normalize(t.team?.name);
            return {
              name: teamName,
              flag: findFlag(teamName),
              p: t.playedGames ?? 0,
              w: t.won ?? 0,
              d: t.draw ?? 0,
              l: t.lost ?? 0,
              gf: t.goalsFor ?? 0,
              ga: t.goalsAgainst ?? 0,
              pts: t.points ?? 0,
            };
          });
        });
        if (Object.keys(smap).length > 0) setStandings(smap);
      }

      if (scorerRes.status === "fulfilled" && scorerRes.value.ok) {
        const data = await scorerRes.value.json();
        setScorers((data.scorers || []).map(s => {
          const country = normalize(s.team?.name || "");
          return {
            name: s.player?.name || "",
            country,
            flag: findFlag(country),
            goals: s.goals ?? 0,
            assists: s.assists ?? 0,
          };
        }));
      }

      setApiOnline(true);
    } catch {
      setApiOnline(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    const id = setInterval(fetchAll, 30000);
    return () => clearInterval(id);
  }, [fetchAll]);

  return { liveData, allMatches, standings, scorers, apiOnline, refetch: fetchAll };
}

// ═══════════════════════════════════════════════════
// TICKER — Résultats du jour/veille uniquement, en vert
// ═══════════════════════════════════════════════════
function Ticker({liveData, matches=MATCHES}) {
  const merge = (m) => {
    const live = liveData[`${m.home}_${m.away}`];
    return {
      ...m,
      status: live?.status ?? m.status,
      hs: live?.hs ?? m.hs,
      as: live?.as ?? m.as,
      minute: live?.minute ?? m.minute,
    };
  };

  const today = new Date();
  const todayDay = today.getDate();
  const yesterdayDay = todayDay - 1;

  const finishedRecent = matches
    .map(merge)
    .filter(m => m.status === "finished" && (m.day === todayDay || m.day === yesterdayDay));

  if (finishedRecent.length === 0) {
    return null; // rien à afficher si aucun résultat réel du jour/veille
  }

  const parts = finishedRecent
    .map(m => `✅ ${m.hf} ${m.home} ${m.hs}-${m.as} ${m.away} ${m.af}`)
    .join("   ·   ");

  const t = parts + "   ·   ";
  return (
    <div style={{background:"#060d1f",borderBottom:`1px solid ${T.border}`,overflow:"hidden",height:26,display:"flex",alignItems:"center"}}>
      <div style={{display:"flex",whiteSpace:"nowrap",animation:"tk 32s linear infinite"}}>
        {[t,t].map((x,i)=><span key={i} style={{fontSize:11,color:T.green,fontWeight:600,paddingRight:60}}>{x}</span>)}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// MATCH CARD
// ═══════════════════════════════════════════════════
function MCard({m, big=false, liveData={}}) {
  const live = liveData[`${m.home}_${m.away}`];
  const status = live?.status ?? m.status;
  const hs = live?.hs ?? m.hs;
  const as = live?.as ?? m.as;
  const minute = live?.minute ?? m.minute;

  return (
    <div style={{background:big?"linear-gradient(145deg,#0d2a5e,#0a1628)":T.s,borderRadius:14,overflow:"hidden",border:`1px solid ${status==="live"?"rgba(239,68,68,0.4)":T.border}`}}>
      <div style={{padding:"8px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${T.border}`,background:"rgba(255,255,255,0.02)"}}>
        <span style={{fontSize:11,color:T.grey,fontWeight:600}}>🏆 World Cup 2026 · Gr. {m.group}</span>
        {status==="live"
          ? <div style={{display:"flex",alignItems:"center",gap:4}}><span className="ld" style={{display:"block",width:7,height:7,borderRadius:"50%",background:T.live}}/><span style={{fontSize:11,fontWeight:800,color:T.live}}>{minute}'</span></div>
          : <span style={{fontSize:11,color:T.grey}}>{m.time} · {m.date}</span>}
      </div>
      <div style={{padding:big?"18px 20px":"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
          <Fl f={m.hf} s={big?48:36}/>
          <span style={{fontSize:big?13:12,fontWeight:700,color:T.white,textAlign:"center",maxWidth:72}}>{m.home}</span>
        </div>
        <div style={{flex:1,textAlign:"center"}}>
          {status!=="upcoming"
            ? <div style={{fontSize:big?34:28,fontWeight:900,color:T.white,letterSpacing:6}}>{hs}<span style={{color:T.g2}}> – </span>{as}</div>
            : <div><div style={{fontSize:big?22:18,fontWeight:900,color:T.white}}>{m.time}</div><div style={{fontSize:10,color:T.grey,marginTop:2}}>{m.date}</div></div>}
          {status==="live" && <div style={{marginTop:4}}><Bdg label="LIVE" color={T.live}/></div>}
          {status==="finished" && <div style={{marginTop:4}}><Bdg label="FT" color={T.grey}/></div>}
        </div>
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
          <Fl f={m.af} s={big?48:36}/>
          <span style={{fontSize:big?13:12,fontWeight:700,color:T.white,textAlign:"center",maxWidth:72}}>{m.away}</span>
        </div>
      </div>
      {m.events?.length>0 && status!=="upcoming" && (
        <div style={{padding:"6px 14px 10px",display:"flex",gap:6,flexWrap:"wrap"}}>
          {m.events.filter(e=>e.type==="goal").map((e,i)=>(
            <span key={i} style={{fontSize:11,color:T.grey,background:T.s2,borderRadius:6,padding:"2px 8px"}}>⚽ {e.player} {e.min}'</span>
          ))}
        </div>
      )}
      <div style={{padding:"6px 14px 10px",borderTop:`1px solid ${T.border}`}}>
        <span style={{fontSize:10,color:T.g2}}>📍 {m.stadium}, {m.city}</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// PAGE HOME
// ═══════════════════════════════════════════════════
function PHome({setPage, fav, liveData={}, scorers=[], matches=MATCHES}) {
  const [,setSec] = useState(0);
  useEffect(()=>{const id=setInterval(()=>setSec(s=>s+1),1000);return()=>clearInterval(id);},[]);

  // Top passeurs dérivé des mêmes données API, trié par passes décisives
  const assisters = [...scorers]
    .filter(s => s.assists > 0)
    .sort((a,b) => b.assists - a.assists);

  // Priorité absolue à l'API : si elle répond, son statut écrase le statut statique fictif
  const liveMs = matches.filter(m => {
    const live = liveData[`${m.home}_${m.away}`];
    const status = live?.status ?? m.status;
    return status === "live";
  });
  const favMs = matches.filter(x=>x.home===fav||x.away===fav);

  // Matchs du jour
  const today = new Date().getDate();
  const todayMs = matches.filter(m => m.day === today);

  return (
    <div className="fu">
      {/* Header */}
      <div style={{background:"linear-gradient(160deg,#0d2a5e 0%,#060d1f 60%)",padding:"20px 16px 18px",position:"relative",overflow:"hidden"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",position:"relative"}}>
          <div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.4)",fontWeight:700,letterSpacing:3}}>FIFA WORLD CUP 2026</div>
            <div style={{fontSize:22,fontWeight:900,color:T.white,lineHeight:1.05}}>XARITSOCCER</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.35)"}}>11 JUN – 19 JUL · USA / Canada / México</div>
          </div>
          {liveMs.length > 0
            ? <div style={{display:"flex",alignItems:"center",gap:5,background:"rgba(239,68,68,0.15)",border:"1px solid rgba(239,68,68,0.4)",borderRadius:20,padding:"5px 10px"}}><span className="ld" style={{display:"block",width:7,height:7,borderRadius:"50%",background:T.live}}/><span style={{fontSize:11,fontWeight:800,color:T.live}}>{liveMs.length} LIVE</span></div>
            : <div style={{display:"flex",alignItems:"center",gap:5,background:"rgba(34,197,94,0.15)",border:"1px solid rgba(34,197,94,0.4)",borderRadius:20,padding:"5px 10px"}}><span style={{display:"block",width:7,height:7,borderRadius:"50%",background:T.green}}/><span style={{fontSize:11,fontWeight:800,color:T.green}}>EN COURS</span></div>}
        </div>
      </div>

      <div style={{padding:"14px 14px 0"}}>
        {/* Matchs LIVE */}
        {liveMs.length > 0 && (
          <div style={{marginBottom:14}}>
            <SecTitle>🔴 En direct</SecTitle>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {liveMs.map(m=><MCard key={m.id} m={m} big liveData={liveData}/>)}
            </div>
          </div>
        )}

        {/* Matchs du jour */}
        {todayMs.length > 0 && (
          <div style={{marginBottom:14}}>
            <SecTitle action="Voir tout" onAction={()=>setPage(1)}>📅 Matchs du jour</SecTitle>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {todayMs.slice(0,3).map(m=><MCard key={m.id} m={m} liveData={liveData}/>)}
            </div>
          </div>
        )}

        {/* Équipe favorite */}
        {favMs.length > 0 && (
          <div style={{marginBottom:14}}>
            <SecTitle action="Voir tout" onAction={()=>setPage(1)}>{fav==="Senegal"?"🦁 Les Lions du Sénégal":`⭐ ${fav}`}</SecTitle>
            <div style={{background:fav==="Senegal"?"linear-gradient(135deg,#002e1a,#001a10)":"linear-gradient(135deg,#0d2a5e,#060d1f)",borderRadius:14,overflow:"hidden",border:`1px solid ${fav==="Senegal"?"rgba(0,179,89,0.3)":T.border}`}}>
              {favMs.map((x,i)=>{
                const live = liveData[`${x.home}_${x.away}`] || {};
                const status = live.status || x.status;
                const hs = live.hs ?? x.hs;
                const as = live.as ?? x.as;
                return (
                  <div key={x.id} style={{padding:"11px 14px",borderTop:i>0?`1px solid ${fav==="Senegal"?"rgba(0,179,89,0.1)":T.border}`:"none",display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:38,textAlign:"center"}}>
                      <div style={{fontSize:13,fontWeight:700,color:T.grey}}>{x.date.split(" ")[1]}</div>
                      <div style={{fontSize:10,color:T.g2}}>{x.date.split(" ")[0]}</div>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:700,color:T.white}}>{x.hf} {x.home} vs {x.af} {x.away}</div>
                      <div style={{fontSize:11,color:T.g2,marginTop:2}}>{x.stadium}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      {status!=="upcoming"
                        ? <div style={{fontSize:16,fontWeight:900,color:status==="live"?T.live:T.white}}>{hs} – {as}</div>
                        : <div style={{fontSize:12,fontWeight:700,color:T.white}}>{x.time}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Top buteurs — liste complète issue de l'API */}
        {scorers.length > 0 ? (
          <div style={{marginBottom:14}}>
            <SecTitle>⚽ Meilleurs buteurs</SecTitle>
            <div style={{background:T.s,borderRadius:14,overflow:"hidden",border:`1px solid ${T.border}`}}>
              {scorers.map((s,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderTop:i>0?`1px solid ${T.border}`:"none"}}>
                  <span style={{fontSize:12,fontWeight:800,color:i<3?T.gold:T.grey,width:16}}>{i+1}</span>
                  <span style={{fontSize:18}}>{s.flag}</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700,color:T.white}}>{s.name}</div>
                    <div style={{fontSize:11,color:T.grey}}>{s.country}</div>
                  </div>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontSize:18,fontWeight:900,color:T.gold}}>{s.goals}</div>
                    <div style={{fontSize:9,color:T.grey}}>buts</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{marginBottom:14}}>
            <SecTitle>⚽ Meilleurs buteurs</SecTitle>
            <div style={{background:T.s,borderRadius:14,padding:24,border:`1px solid ${T.border}`,textAlign:"center"}}>
              <div style={{fontSize:28,marginBottom:8}}>📊</div>
              <div style={{fontSize:12,color:T.grey}}>Classement en cours de chargement…</div>
            </div>
          </div>
        )}

        {/* Top passeurs — liste complète issue de l'API */}
        {assisters.length > 0 && (
          <div style={{marginBottom:14}}>
            <SecTitle>🎯 Meilleurs passeurs</SecTitle>
            <div style={{background:T.s,borderRadius:14,overflow:"hidden",border:`1px solid ${T.border}`}}>
              {assisters.map((s,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderTop:i>0?`1px solid ${T.border}`:"none"}}>
                  <span style={{fontSize:12,fontWeight:800,color:i<3?T.bl:T.grey,width:16}}>{i+1}</span>
                  <span style={{fontSize:18}}>{s.flag}</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700,color:T.white}}>{s.name}</div>
                    <div style={{fontSize:11,color:T.grey}}>{s.country}</div>
                  </div>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontSize:18,fontWeight:900,color:T.bl}}>{s.assists}</div>
                    <div style={{fontSize:9,color:T.grey}}>passes</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// PAGE MATCHS
// ═══════════════════════════════════════════════════
function PMatches({fav, liveData={}, matches=MATCHES}) {
  // Détecte le jour actuel automatiquement
  const [day, setDay] = useState(() => new Date().getDate());
  const [filter, setFilter] = useState("Jour");
  const [selMatch, setSelMatch] = useState(null);
  const [dtab, setDtab] = useState("info");

  // ─── Compositions & événements réels — via API-Football (api-football.com) ───
  // IMPORTANT : ces hooks doivent être appelés à chaque rendu, sans condition,
  // pour respecter les règles de React (jamais de hook dans un if).
  const [homeLineup, setHomeLineup] = useState(null);
  const [awayLineup, setAwayLineup] = useState(null);
  const [apiEvents, setApiEvents] = useState([]);
  const [fixtureId, setFixtureId] = useState(null);

  // 1. Trouve le fixture id chez API-Football à partir de la date (ISO) + noms d'équipes
  useEffect(() => {
    setHomeLineup(null);
    setAwayLineup(null);
    setApiEvents([]);
    setFixtureId(null);

    if (!selMatch || !selMatch.isoDate) return;
    const m = selMatch;

    let cancelled = false;
    async function loadFixture() {
      try {
        const r = await fetch(`/api/apifootball?endpoint=find-fixture&date=${m.isoDate}&team1=${encodeURIComponent(m.home)}&team2=${encodeURIComponent(m.away)}`);
        const data = await r.json();
        if (!cancelled && data.fixtureId) setFixtureId(data.fixtureId);
      } catch (e) { console.error("Fixture lookup error:", e); }
    }
    loadFixture();
    return () => { cancelled = true; };
  }, [selMatch?.id, selMatch?.isoDate, selMatch?.home, selMatch?.away]);

  // 2. Une fois le fixture trouvé, récupère compositions + événements
  useEffect(() => {
    if (!fixtureId || !selMatch) return;
    const m = selMatch;
    let cancelled = false;

    async function loadLineups() {
      try {
        const r = await fetch(`/api/apifootball?endpoint=lineups&fixture=${fixtureId}`);
        const data = await r.json();
        if (!cancelled && data.response && data.response.length === 2) {
          const mapPos = (p) => p === "G" ? "GB" : p === "D" ? "DC" : p === "M" ? "MC" : "AT";
          const toLineup = (team) => ({
            formation: team.formation,
            players: (team.startXI || []).map(s => ({
              num: s.player.number,
              n: s.player.name,
              pos: mapPos(s.player.pos),
            })),
          });
          setHomeLineup(toLineup(data.response[0]));
          setAwayLineup(toLineup(data.response[1]));
        }
      } catch (e) { console.error("Lineups error:", e); }
    }

    async function loadEvents() {
      try {
        const r = await fetch(`/api/apifootball?endpoint=events&fixture=${fixtureId}`);
        const data = await r.json();
        if (!cancelled && data.response) {
          const mapped = data.response.map(ev => ({
            min: ev.time?.elapsed,
            team: ev.team?.name === m.home ? "home" : "away",
            player: ev.player?.name,
            type: ev.type === "Goal" ? "goal" : ev.detail === "Yellow Card" ? "yellow" : ev.detail === "Red Card" ? "red" : "sub",
          }));
          setApiEvents(mapped);
        }
      } catch (e) { console.error("Events error:", e); }
    }

    loadLineups();
    loadEvents();
    return () => { cancelled = true; };
  }, [fixtureId]);

  const days = [...new Set(matches.map(m=>m.day).filter(Boolean))].sort((a,b)=>a-b);

  const CAL = days.map(d => ({
    day: d,
    match: matches.some(m => m.day === d),
    sen: matches.some(m => m.day === d && m.isSenegal),
    live: matches.some(m => {
      const live = liveData[`${m.home}_${m.away}`];
      return m.day === d && (live?.status ?? m.status) === "live";
    }),
  }));

  const LIVE_MATCHES = matches.map(m => {
    const live = liveData[`${m.home}_${m.away}`];
    const status = live?.status ?? m.status;
    return {
      ...m,
      status,
      hs: live?.hs ?? m.hs,
      as: live?.as ?? m.as,
      minute: live?.minute ?? m.minute,
    };
  });

  const isSenFilter = filter === fav || filter === "Senegal";
  const isAllFilter = filter === "Calendrier";
  const dayMs = isSenFilter
    ? LIVE_MATCHES.filter(m => m.home===fav || m.away===fav)
    : isAllFilter
    ? LIVE_MATCHES // onglet "Tous les matchs" — calendrier complet, pas de filtre par jour
    : LIVE_MATCHES.filter(m => {
        if(m.day !== day) return false;
        if(filter==="Live") return m.status==="live";
        return true;
      });

  // Pour le calendrier complet, groupe par date plutôt que par groupe
  const byDate = {};
  if (isAllFilter) {
    dayMs.forEach(m => { if(!byDate[m.date]) byDate[m.date]=[]; byDate[m.date].push(m); });
  }

  const byGrp = {};
  dayMs.forEach(m => { if(!byGrp[m.group]) byGrp[m.group]=[]; byGrp[m.group].push(m); });

  // ── DETAIL MATCH ──
  if(selMatch) {
    const m = selMatch;
    const live = liveData[`${m.home}_${m.away}`];
    const status = live?.status ?? m.status;
    const hs = live?.hs ?? m.hs;
    const as = live?.as ?? m.as;
    const minute = live?.minute ?? m.minute;
    const isSen = m.home==="Senegal" || m.away==="Senegal";

    const H2H = {
      "France-Senegal":[{year:2002,comp:"Coupe du Monde",home:"Sénégal",hf:"🇸🇳",hs:1,as:0,away:"France",af:"🇫🇷",note:"Choc historique !"},{year:2022,comp:"Coupe du Monde",home:"Angleterre",hf:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",hs:3,as:0,away:"Sénégal",af:"🇸🇳",note:"1/8 de finale"}],
      "Senegal-France":[{year:2002,comp:"Coupe du Monde",home:"Sénégal",hf:"🇸🇳",hs:1,as:0,away:"France",af:"🇫🇷",note:"Choc historique !"}],
      "Norway-Senegal":[{year:2002,comp:"Phase de groupes",home:"Sénégal",hf:"🇸🇳",hs:1,as:1,away:"Danemark",af:"🇩🇰",note:"Phase groupes"}],
      "Argentina-Algeria":[{year:2026,comp:"Coupe du Monde 2026",home:"Argentine",hf:"🇦🇷",hs:3,as:0,away:"Algérie",af:"🇩🇿",note:"Messi hat-trick !"}],
    };

    const h2hKey = `${m.home}-${m.away}`;
    const h2hData = H2H[h2hKey] || H2H[`${m.away}-${m.home}`] || [];

    const POS_COLORS = {
      GB:"#1d4ed8",
      DC:"#16a34a",DD:"#16a34a",DG:"#16a34a",
      MC:"#d97706",MD:"#d97706",MG:"#d97706",MO:"#7c3aed",
      AT:"#dc2626",AD:"#dc2626",AG:"#dc2626"
    };

    const POS_ROWS = [
      {label:"GB", positions:["GB"]},
      {label:"DEF", positions:["DD","DC","DG"]},
      {label:"MIL", positions:["MD","MC","MG","MO"]},
      {label:"ATT", positions:["AD","AT","AG"]},
    ];

    const LineupField = ({lineup, isSen, reversed=false}) => {
      if(!lineup) return <div style={{textAlign:"center",color:"rgba(255,255,255,0.4)",fontSize:13,padding:30}}>Composition non disponible</div>;
      const rows = reversed ? [...POS_ROWS].reverse() : POS_ROWS;
      return (
        <div style={{display:"flex",flexDirection:"column",gap:12,position:"relative",zIndex:2,padding:"8px 0"}}>
          {rows.map(({positions})=>{
            const pl = lineup.players.filter(p=>positions.includes(p.pos));
            if(!pl.length) return null;
            return (
              <div key={positions.join()} style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                {pl.map((p,i)=>(
                  <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                    <div style={{
                      width:40,height:40,borderRadius:"50%",
                      background:POS_COLORS[p.pos]||"#374151",
                      border:"2.5px solid rgba(255,255,255,0.85)",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:13,fontWeight:900,color:"white",
                      boxShadow:"0 2px 8px rgba(0,0,0,0.5)",
                    }}>{p.num}</div>
                    <span style={{
                      fontSize:9,fontWeight:700,color:"white",
                      textAlign:"center",maxWidth:52,
                      textShadow:"0 1px 4px rgba(0,0,0,0.9)",
                      lineHeight:1.2,
                    }}>{p.n.split(" ").pop()}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      );
    };

    return (
      <div className="fu">
        <div style={{background:"linear-gradient(160deg,#0d2a5e,#060d1f)",padding:"14px 16px 0"}}>
          <button onClick={()=>setSelMatch(null)} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:20,padding:"6px 14px",color:T.white,fontSize:12,fontWeight:700,cursor:"pointer",marginBottom:14}}>← Retour</button>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingBottom:16}}>
            <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
              <Fl f={m.hf} s={44}/>
              <span style={{fontSize:13,fontWeight:800,color:m.home==="Senegal"?T.sen:T.white,textAlign:"center"}}>{m.home}</span>
            </div>
            <div style={{flex:1,textAlign:"center"}}>
              {status==="live"
                ? <div><div style={{fontSize:32,fontWeight:900,color:T.white,letterSpacing:6}}>{hs} – {as}</div><div style={{color:T.live,fontSize:12,fontWeight:800,marginTop:4}}>🔴 LIVE {minute}'</div></div>
                : status==="finished"
                ? <div><div style={{fontSize:30,fontWeight:900,color:T.white,letterSpacing:6}}>{hs} – {as}</div><div style={{color:T.grey,fontSize:11,marginTop:4}}>FT</div></div>
                : <div><div style={{fontSize:22,fontWeight:900,color:T.white}}>{m.time}</div><div style={{fontSize:11,color:T.grey,marginTop:2}}>{m.date}</div><div style={{marginTop:6}}><Bdg label={`Groupe ${m.group}`} color={isSen?T.sen:T.bl}/></div></div>}
            </div>
            <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
              <Fl f={m.af} s={44}/>
              <span style={{fontSize:13,fontWeight:800,color:m.away==="Senegal"?T.sen:T.white,textAlign:"center"}}>{m.away}</span>
            </div>
          </div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",textAlign:"center",paddingBottom:10}}>📍 {m.stadium}, {m.city}</div>
          <div style={{display:"flex",borderTop:"1px solid rgba(255,255,255,0.08)"}}>
            {[{k:"info",l:"ℹ️ Infos"},{k:"lineup",l:"👥 Compo"},{k:"h2h",l:"⚔️ H2H"},{k:"events",l:"📋 Événements"}].map(t=>(
              <button key={t.k} onClick={()=>setDtab(t.k)} style={{flex:1,background:"none",border:"none",color:dtab===t.k?T.white:T.grey,fontWeight:dtab===t.k?800:400,fontSize:10,padding:"10px 2px",borderBottom:dtab===t.k?`2px solid ${T.bl}`:"2px solid transparent",cursor:"pointer"}}>{t.l}</button>
            ))}
          </div>
        </div>

        <div style={{padding:"14px"}}>
          {/* INFOS */}
          {dtab==="info" && (
            <div>
              <div style={{background:T.s,borderRadius:14,overflow:"hidden",border:`1px solid ${T.border}`,marginBottom:12}}>
                {[
                  {l:"Compétition",v:"🏆 FIFA World Cup 2026"},
                  {l:"Groupe",v:`Groupe ${m.group}`},
                  {l:"Date",v:m.date},
                  {l:"Heure",v:m.time+" (heure Paris)"},
                  {l:"Stade",v:m.stadium},
                  {l:"Ville",v:m.city},
                  {l:"Statut",v:status==="upcoming"?"À venir":status==="live"?"🔴 En direct":"✅ Terminé"},
                ].map((s,i)=>(
                  <div key={s.l} style={{display:"flex",justifyContent:"space-between",padding:"11px 14px",borderBottom:i<6?`1px solid ${T.border}`:"none"}}>
                    <span style={{fontSize:13,color:T.grey}}>{s.l}</span>
                    <span style={{fontSize:13,fontWeight:700,color:T.white,textAlign:"right"}}>{s.v}</span>
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {[{t:m.home,f:m.hf,sen:m.home==="Senegal"},{t:m.away,f:m.af,sen:m.away==="Senegal"}].map(tm=>(
                  <div key={tm.t} style={{background:tm.sen?"rgba(0,179,89,0.08)":T.s,borderRadius:12,padding:12,border:`1px solid ${tm.sen?"rgba(0,179,89,0.3)":T.border}`,textAlign:"center"}}>
                    <Fl f={tm.f} s={36}/>
                    <div style={{fontSize:13,fontWeight:800,color:tm.sen?T.sen:T.white,marginTop:6}}>{tm.t}</div>
                    {tm.sen&&<div style={{fontSize:10,color:T.sen,marginTop:3}}>🦁 Allez les Lions !</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LINEUP — uniquement si l'API fournit des données réelles */}
          {dtab==="lineup" && (
            <div>
              {(homeLineup || awayLineup) ? (
                <>
                  <div style={{background:"rgba(245,158,11,0.08)",borderRadius:10,padding:"10px 14px",marginBottom:12,border:"1px solid rgba(245,158,11,0.2)"}}>
                    <span style={{fontSize:12,color:T.gold,fontWeight:700}}>⚠️ Compositions probables — non officielles</span>
                  </div>
                  <div style={{
                    background:"linear-gradient(180deg,#14532d 0%,#166534 50%,#14532d 100%)",
                    borderRadius:16,
                    padding:"14px 8px",
                    position:"relative",
                    border:"2px solid #15803d",
                    marginBottom:12,
                    overflow:"hidden",
                  }}>
                    <div style={{position:"absolute",top:"50%",left:"6%",right:"6%",height:1,background:"rgba(255,255,255,0.25)",zIndex:1}}/>
                    <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:72,height:72,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.2)",zIndex:1}}/>
                    <div style={{position:"absolute",top:8,left:"25%",right:"25%",height:40,border:"1px solid rgba(255,255,255,0.2)",borderBottom:"none",zIndex:1,borderRadius:"4px 4px 0 0"}}/>
                    <div style={{position:"absolute",bottom:8,left:"25%",right:"25%",height:40,border:"1px solid rgba(255,255,255,0.2)",borderTop:"none",zIndex:1,borderRadius:"0 0 4px 4px"}}/>
                    <div style={{marginBottom:8}}>
                      <div style={{textAlign:"center",marginBottom:6}}>
                        <span style={{fontSize:10,fontWeight:800,color:"rgba(255,255,255,0.7)",background:"rgba(0,0,0,0.4)",padding:"2px 10px",borderRadius:10,letterSpacing:1}}>{m.home} {homeLineup?"· "+homeLineup.formation:""}</span>
                      </div>
                      <LineupField lineup={homeLineup} isSen={m.home==="Senegal"} reversed={false}/>
                    </div>
                    <div style={{height:1,background:"rgba(255,255,255,0.15)",margin:"6px 0",position:"relative",zIndex:2}}/>
                    <div style={{marginTop:8}}>
                      <LineupField lineup={awayLineup} isSen={m.away==="Senegal"} reversed={true}/>
                      <div style={{textAlign:"center",marginTop:6}}>
                        <span style={{fontSize:10,fontWeight:800,color:"rgba(255,255,255,0.7)",background:"rgba(0,0,0,0.4)",padding:"2px 10px",borderRadius:10,letterSpacing:1}}>{m.away} {awayLineup?"· "+awayLineup.formation:""}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center"}}>
                    {[{l:"Gardien",c:"#1d4ed8"},{l:"Défenseur",c:"#16a34a"},{l:"Milieu",c:"#d97706"},{l:"Attaquant",c:"#dc2626"}].map(x=>(
                      <div key={x.l} style={{display:"flex",alignItems:"center",gap:5,background:T.s,borderRadius:8,padding:"4px 10px",border:`1px solid ${T.border}`}}>
                        <div style={{width:10,height:10,borderRadius:"50%",background:x.c}}/>
                        <span style={{fontSize:10,color:T.grey}}>{x.l}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{background:T.s,borderRadius:14,padding:36,border:`1px solid ${T.border}`,textAlign:"center"}}>
                  <div style={{fontSize:32,marginBottom:10}}>👥</div>
                  <div style={{fontSize:14,fontWeight:700,color:T.white,marginBottom:6}}>Compositions non disponibles</div>
                  <div style={{fontSize:12,color:T.grey}}>Elles seront publiées environ 1h avant le coup d'envoi</div>
                </div>
              )}
            </div>
          )}

          {/* H2H */}
          {dtab==="h2h" && (
            <div>
              <div style={{background:T.s,borderRadius:14,overflow:"hidden",border:`1px solid ${T.border}`,marginBottom:12}}>
                <div style={{padding:"10px 14px",borderBottom:`1px solid ${T.border}`}}>
                  <span style={{fontSize:12,fontWeight:800,color:T.white}}>⚔️ Confrontations directes</span>
                </div>
                {h2hData.length===0 ? (
                  <div style={{padding:"30px",textAlign:"center",color:T.grey,fontSize:13}}>
                    <div style={{fontSize:28,marginBottom:8}}>📊</div>
                    Aucune confrontation directe en Coupe du Monde
                  </div>
                ) : h2hData.map((h,i)=>(
                  <div key={i} style={{padding:"14px",borderTop:i>0?`1px solid ${T.border}`:"none"}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,alignItems:"center"}}>
                      <Bdg label={h.year} color={T.gold}/>
                      <span style={{fontSize:11,color:T.grey}}>{h.comp}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <div style={{flex:1,display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:18}}>{h.hf}</span><span style={{fontSize:12,fontWeight:600,color:T.white}}>{h.home}</span></div>
                      <div style={{background:T.s2,borderRadius:8,padding:"6px 12px",fontWeight:900,fontSize:16,color:T.white,letterSpacing:4}}>{h.hs} – {h.as}</div>
                      <div style={{flex:1,display:"flex",alignItems:"center",gap:6,justifyContent:"flex-end"}}><span style={{fontSize:12,fontWeight:600,color:T.white,textAlign:"right"}}>{h.away}</span><span style={{fontSize:18}}>{h.af}</span></div>
                    </div>
                    {h.note&&<div style={{marginTop:6,fontSize:11,color:T.gold,fontStyle:"italic"}}>→ {h.note}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EVENTS style app foot — alimenté par API-Football */}
          {dtab==="events" && (
            <div>
              {status==="upcoming" ? (
                <div style={{background:T.s,borderRadius:14,padding:30,border:`1px solid ${T.border}`,textAlign:"center"}}>
                  <div style={{fontSize:32,marginBottom:10}}>⏳</div>
                  <div style={{fontSize:14,fontWeight:700,color:T.white,marginBottom:6}}>Match pas encore commencé</div>
                  <div style={{fontSize:12,color:T.grey}}>Les événements apparaîtront ici en temps réel</div>
                  <div style={{marginTop:14}}><Bdg label={`${m.date} · ${m.time}`} color={T.bl}/></div>
                </div>
              ) : (
                <div style={{background:T.s,borderRadius:14,overflow:"hidden",border:`1px solid ${T.border}`}}>
                  {/* Score header style app */}
                  <div style={{background:"rgba(255,255,255,0.04)",padding:"16px",borderBottom:`1px solid ${T.border}`}}>
                    <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",marginBottom:8}}>
                      <div style={{textAlign:"center",flex:1}}>
                        <Fl f={m.hf} s={36}/>
                        <div style={{fontSize:12,fontWeight:700,color:T.white,marginTop:4}}>{m.home}</div>
                      </div>
                      <div style={{textAlign:"center",flex:1}}>
                        <div style={{fontSize:36,fontWeight:900,color:T.white,letterSpacing:8}}>{hs} – {as}</div>
                        <span style={{fontSize:11,color:status==="live"?T.live:T.grey,fontWeight:700}}>{status==="live"?`🔴 LIVE ${minute}'`:"FT"}</span>
                      </div>
                      <div style={{textAlign:"center",flex:1}}>
                        <Fl f={m.af} s={36}/>
                        <div style={{fontSize:12,fontWeight:700,color:T.white,marginTop:4}}>{m.away}</div>
                      </div>
                    </div>
                    {/* Buts en ligne */}
                    {apiEvents?.filter(e=>e.type==="goal").map((e,i)=>(
                      <div key={i} style={{
                        display:"flex",
                        justifyContent: e.team==="home" ? "flex-start" : "flex-end",
                        padding:"2px 8px",
                      }}>
                        <span style={{fontSize:11,color:T.grey}}>
                          {e.team==="home" ? `⚽ ${e.player} ${e.min}'` : `${e.min}' ${e.player} ⚽`}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Timeline */}
                  {(apiEvents||[]).length === 0 ? (
                    <div style={{padding:30,textAlign:"center",color:T.grey,fontSize:13}}>Aucun événement</div>
                  ) : (
                    <div style={{padding:"6px 0"}}>
                      {[...(apiEvents||[])].sort((a,b)=>b.min-a.min).map((e,i)=>{
                        const isHome = e.team==="home";
                        const icon = e.type==="goal"?"⚽":e.type==="yellow"?"🟨":e.type==="red"?"🟥":"🔄";
                        return (
                          <div key={i} style={{
                            display:"flex",
                            alignItems:"center",
                            padding:"10px 14px",
                            borderBottom:i<(apiEvents||[]).length-1?`1px solid ${T.border}`:"none",
                          }}>
                            {isHome ? (
                              <>
                                <div style={{flex:1,textAlign:"left"}}>
                                  <div style={{fontSize:13,fontWeight:700,color:T.white}}>{e.player}</div>
                                  <div style={{fontSize:11,color:T.grey}}>{e.type==="goal"?"But":e.type==="yellow"?"Carton jaune":"Carton rouge"}</div>
                                </div>
                                <div style={{width:44,height:44,borderRadius:"50%",background:T.s2,border:`2px solid ${T.border}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",margin:"0 12px",flexShrink:0}}>
                                  <div style={{fontSize:9,color:T.grey}}>min</div>
                                  <div style={{fontSize:13,fontWeight:900,color:T.white}}>{e.min}'</div>
                                </div>
                                <div style={{width:32,textAlign:"right",fontSize:20}}>{icon}</div>
                              </>
                            ) : (
                              <>
                                <div style={{width:32,textAlign:"left",fontSize:20}}>{icon}</div>
                                <div style={{width:44,height:44,borderRadius:"50%",background:T.s2,border:`2px solid ${T.border}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",margin:"0 12px",flexShrink:0}}>
                                  <div style={{fontSize:9,color:T.grey}}>min</div>
                                  <div style={{fontSize:13,fontWeight:900,color:T.white}}>{e.min}'</div>
                                </div>
                                <div style={{flex:1,textAlign:"right"}}>
                                  <div style={{fontSize:13,fontWeight:700,color:T.white}}>{e.player}</div>
                                  <div style={{fontSize:11,color:T.grey}}>{e.type==="goal"?"But":e.type==="yellow"?"Carton jaune":"Carton rouge"}</div>
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── LISTE MATCHS ──
  return (
    <div className="fu">
      <div style={{background:T.bg,position:"sticky",top:0,zIndex:20,borderBottom:`1px solid ${T.border}`}}>
        <div style={{padding:"12px 16px 8px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{fontSize:15,fontWeight:800,color:T.white}}>Juin 2026</span>
          <div style={{display:"flex",alignItems:"center",gap:6,background:"rgba(34,197,94,0.12)",border:"1px solid rgba(34,197,94,0.3)",borderRadius:20,padding:"4px 10px"}}>
            <span style={{display:"block",width:6,height:6,borderRadius:"50%",background:T.green}}/>
            <span style={{fontSize:11,fontWeight:800,color:T.green}}>En cours</span>
          </div>
        </div>

        {/* Calendrier de jours — masqué en mode Calendrier complet ou Sénégal */}
        {!isSenFilter && !isAllFilter && (
          <div style={{display:"flex",overflowX:"auto",scrollbarWidth:"none",padding:"0 10px 8px"}}>
            {CAL.map(c=>(
              <div key={c.day} onClick={()=>setDay(c.day)} style={{flex:"0 0 auto",width:44,textAlign:"center",cursor:"pointer"}}>
                <div style={{width:34,height:34,borderRadius:"50%",margin:"0 auto",background:day===c.day?T.blue:"transparent",border:c.live?"2px solid "+T.live:day===c.day?"none":"none",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                  <span style={{fontSize:13,fontWeight:700,color:day===c.day?T.white:T.white}}>{c.day}</span>
                  {c.match && <span style={{position:"absolute",bottom:1,left:"50%",transform:"translateX(-50%)",width:4,height:4,borderRadius:"50%",background:c.live?T.live:c.sen?T.sen:T.g2}}/>}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{display:"flex",gap:8,padding:"0 14px 10px",overflowX:"auto",scrollbarWidth:"none"}}>
          {["Jour","Calendrier","Live",fav].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?(f===fav?"rgba(0,179,89,0.9)":T.blue):T.s2,color:filter===f?T.white:T.grey,border:filter===f&&f===fav?"2px solid #00b359":"none",borderRadius:20,padding:"5px 14px",fontSize:11,fontWeight:700,cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}}>
              {f==="Senegal"?"🦁 Sénégal":f==="Calendrier"?"📅 Tous les matchs":f}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:"10px 14px"}}>
        {isSenFilter && (
          <div style={{background:"linear-gradient(135deg,#002e1a,#001a10)",borderRadius:14,padding:"14px 16px",marginBottom:12,border:"1px solid rgba(0,179,89,0.3)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:24}}>🦁</span>
              <div><div style={{fontSize:15,fontWeight:900,color:T.white}}>Les Lions du Sénégal</div><div style={{fontSize:11,color:T.sen}}>Groupe I · France · Norvège · Irak</div></div>
            </div>
          </div>
        )}

        {Object.keys(byGrp).length===0 && dayMs.length===0 && (
          <div style={{textAlign:"center",padding:"50px 20px",color:T.grey}}>
            <div style={{fontSize:32,marginBottom:10}}>📭</div>
            <div>Aucun match{isAllFilter?"":" ce jour"}</div>
          </div>
        )}

        {/* Vue Calendrier complet — groupée par date */}
        {isAllFilter && Object.entries(byDate).map(([date,ms])=>(
          <div key={date} style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:800,color:T.grey,letterSpacing:1,marginBottom:8,paddingLeft:4}}>{date.toUpperCase()}</div>
            <div style={{background:T.s,borderRadius:14,overflow:"hidden",border:`1px solid ${T.border}`}}>
              {ms.map((m,i)=>(
                <div key={m.id} onClick={()=>{setSelMatch(m);setDtab("info");}}
                  style={{borderTop:i>0?`1px solid ${T.border}`:"none",background:m.isSenegal?"rgba(0,179,89,0.04)":"transparent",padding:"12px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
                  <Bdg label={`GR.${m.group}`} color={m.group==="I"?T.sen:T.bl}/>
                  <Fl f={m.hf} s={22}/>
                  <span style={{flex:1,fontSize:12,fontWeight:600,color:m.home==="Senegal"?T.sen:T.white}}>{m.home}</span>
                  <span style={{fontSize:14,fontWeight:900,color:m.status==="live"?T.live:T.white,minWidth:16,textAlign:"center"}}>{m.status!=="upcoming"?m.hs:""}</span>
                  <span style={{fontSize:10,color:T.grey,minWidth:34,textAlign:"center"}}>{m.status==="upcoming"?m.time:"–"}</span>
                  <span style={{fontSize:14,fontWeight:900,color:m.status==="live"?T.live:T.white,minWidth:16,textAlign:"center"}}>{m.status!=="upcoming"?m.as:""}</span>
                  <span style={{flex:1,fontSize:12,fontWeight:600,color:m.away==="Senegal"?T.sen:T.white,textAlign:"right"}}>{m.away}</span>
                  <Fl f={m.af} s={22}/>
                  {m.status==="live" && <span className="ld" style={{width:6,height:6,borderRadius:"50%",background:T.live,flexShrink:0}}/>}
                </div>
              ))}
            </div>
          </div>
        ))}

        {!isAllFilter && Object.entries(byGrp).map(([grp,ms])=>(
          <div key={grp} style={{background:T.s,borderRadius:14,overflow:"hidden",border:`1px solid ${grp==="I"?"rgba(0,179,89,0.25)":T.border}`,marginBottom:12}}>
            <div style={{padding:"10px 14px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:12,fontWeight:700,color:T.white}}>FIFA World Cup 2026</div>
                <div style={{fontSize:11,color:T.grey}}>Phase de groupes</div>
              </div>
              <Bdg label={`GR. ${grp}`} color={grp==="I"?T.sen:T.bl}/>
            </div>
            {ms.map((m,i)=>(
              <div key={m.id} onClick={()=>{setSelMatch(m);setDtab("info");}}
                style={{borderTop:i>0?`1px solid ${T.border}`:"none",background:m.isSenegal?"rgba(0,179,89,0.04)":"transparent",padding:"12px 14px",cursor:"pointer"}}
                onMouseEnter={e=>e.currentTarget.style.background=m.isSenegal?"rgba(0,179,89,0.08)":"rgba(255,255,255,0.03)"}
                onMouseLeave={e=>e.currentTarget.style.background=m.isSenegal?"rgba(0,179,89,0.04)":"transparent"}>
                <div style={{fontSize:10,color:T.g2,marginBottom:8}}>{m.stadium} · {m.city}</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:5}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,flex:1}}>
                    <Fl f={m.hf} s={26}/>
                    <span style={{fontSize:14,fontWeight:600,color:m.home==="Senegal"?T.sen:T.white}}>{m.home}{m.home==="Senegal"?" 🦁":""}</span>
                  </div>
                  <span style={{fontSize:16,fontWeight:900,color:m.status==="live"?T.live:T.white}}>{m.status!=="upcoming"?m.hs:""}</span>
                </div>
                <div style={{paddingLeft:34,marginBottom:5}}>
                  {m.status==="live"
                    ? <div style={{display:"flex",alignItems:"center",gap:4}}><span className="ld" style={{display:"block",width:6,height:6,borderRadius:"50%",background:T.live}}/><span style={{fontSize:11,fontWeight:800,color:T.live}}>{m.minute}'</span></div>
                    : <span style={{fontSize:13,fontWeight:800,color:m.status==="finished"?T.grey:T.white}}>{m.status==="finished"?"FT":m.time}</span>}
                </div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,flex:1}}>
                    <Fl f={m.af} s={26}/>
                    <span style={{fontSize:14,fontWeight:600,color:m.away==="Senegal"?T.sen:T.white}}>{m.away}{m.away==="Senegal"?" 🦁":""}</span>
                  </div>
                  <span style={{fontSize:16,fontWeight:900,color:m.status==="live"?T.live:T.white}}>{m.status!=="upcoming"?m.as:""}</span>
                </div>
                <div style={{marginTop:6,fontSize:10,color:T.g2}}>Tap pour détails · Compo · H2H ›</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// PAGE GROUPES
// ═══════════════════════════════════════════════════
function PGroups({standings={}}) {
  const [sel, setSel] = useState("I");
  const scrollRef = useRef(null);

  const liveGroup = standings[sel] || standings["Group "+sel] || null;
  const teams = liveGroup
    ? liveGroup.map(t => ({
        name: t.name,
        flag: GROUPS[sel]?.find(g => g.name === t.name)?.flag || "🏳️",
        p: t.p ?? 0, w: t.w ?? 0, d: t.d ?? 0, l: t.l ?? 0,
        gf: t.gf ?? 0, ga: t.ga ?? 0, pts: t.pts ?? 0,
      }))
    : [...(GROUPS[sel]||[])].sort((a,b)=>b.pts-a.pts||((b.gf-b.ga)-(a.gf-a.ga)));

  return (
    <div className="fu" ref={scrollRef} style={{overflowY:"auto"}}>
      <div style={{background:T.bg,position:"sticky",top:0,zIndex:20,borderBottom:`1px solid ${T.border}`,padding:"14px 16px 10px"}}>
        <div style={{fontSize:16,fontWeight:900,color:T.white,marginBottom:12}}>Groupes · Phase de poules</div>
        <div style={{display:"flex",gap:8,overflowX:"auto",scrollbarWidth:"none"}}>
          {Object.keys(GROUPS).map(g=>(
            <button key={g} onClick={()=>{setSel(g);setTimeout(()=>scrollRef.current?.scrollTo({top:0,behavior:"smooth"}),50);}}
              style={{background:sel===g?T.blue:T.s2,color:sel===g?T.white:T.grey,border:"none",borderRadius:8,minWidth:34,height:34,fontWeight:800,fontSize:13,cursor:"pointer",flexShrink:0}}>{g}</button>
          ))}
        </div>
      </div>
      <div style={{padding:"12px 14px"}}>
        {sel==="I" && (
          <div style={{background:"rgba(0,179,89,0.08)",borderRadius:10,padding:"10px 14px",marginBottom:10,border:"1px solid rgba(0,179,89,0.2)",display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:18}}>🦁</span>
            <div><div style={{fontSize:12,fontWeight:800,color:T.sen}}>Groupe du Sénégal</div><div style={{fontSize:11,color:T.grey}}>France · Sénégal · Norvège · Irak</div></div>
          </div>
        )}
        <div style={{background:T.s,borderRadius:14,overflow:"hidden",border:`1px solid ${sel==="I"?"rgba(0,179,89,0.3)":T.border}`,marginBottom:14}}>
          <div style={{display:"grid",gridTemplateColumns:"4px 1fr 26px 26px 26px 26px 26px 36px",gap:2,padding:"10px 12px",background:T.s2}}>
            <div/><div style={{fontSize:10,fontWeight:700,color:T.grey}}>ÉQUIPE</div>
            {["J","G","N","P","BP","PTS"].map(h=><div key={h} style={{fontSize:10,fontWeight:700,color:T.grey,textAlign:"center"}}>{h}</div>)}
          </div>
          {teams.map((t,i)=>{
            const isSen = t.name==="Senegal";
            return (
              <div key={t.name} style={{display:"grid",gridTemplateColumns:"4px 1fr 26px 26px 26px 26px 26px 36px",gap:2,padding:"12px 12px",borderTop:`1px solid ${T.border}`,background:isSen?"rgba(0,179,89,0.05)":"transparent",alignItems:"center"}}>
                <div style={{width:3,height:22,borderRadius:2,background:i<2?"#22c55e":"transparent",margin:"auto"}}/>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <Fl f={t.flag} s={24}/>
                  <div>
                    <div style={{fontSize:13,fontWeight:isSen?800:500,color:isSen?T.sen:T.white}}>{t.name}</div>
                    {isSen&&<div style={{fontSize:9,color:T.sen}}>🦁 Lions</div>}
                  </div>
                </div>
                {[t.p,t.w,t.d,t.l,t.gf,t.pts].map((v,j)=>(
                  <div key={j} style={{textAlign:"center",fontSize:j===5?14:12,fontWeight:j===5?900:400,color:j===5?T.white:T.grey}}>{v}</div>
                ))}
              </div>
            );
          })}
          <div style={{padding:"7px 12px",borderTop:`1px solid ${T.border}`,display:"flex",gap:8,alignItems:"center"}}>
            <div style={{width:3,height:12,borderRadius:2,background:T.green}}/>
            <span style={{fontSize:10,color:T.grey}}>Qualifié pour les 1/8 de finale</span>
          </div>
        </div>

        <div style={{fontSize:11,fontWeight:700,color:T.grey,letterSpacing:1,marginBottom:10}}>TOUS LES GROUPES</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {Object.entries(GROUPS).map(([g,gt])=>(
            <div key={g} onClick={()=>{setSel(g);setTimeout(()=>scrollRef.current?.scrollTo({top:0,behavior:"smooth"}),50);}}
              style={{background:sel===g?"rgba(29,78,216,0.12)":T.s,borderRadius:12,padding:10,border:sel===g?`1px solid ${T.blue}`:`1px solid ${T.border}`,cursor:"pointer"}}>
              <div style={{fontSize:11,fontWeight:800,color:sel===g?T.bl:T.grey,marginBottom:8}}>Groupe {g}</div>
              {[...gt].sort((a,b)=>b.pts-a.pts).map(t=>(
                <div key={t.name} style={{display:"flex",alignItems:"center",gap:5,marginBottom:3}}>
                  <span style={{fontSize:12}}>{t.flag}</span>
                  <span style={{fontSize:10,color:t.name==="Senegal"?T.sen:T.grey,fontWeight:t.name==="Senegal"?800:400}}>{t.name}</span>
                  {t.pts>0&&<span style={{marginLeft:"auto",fontSize:10,fontWeight:800,color:T.white}}>{t.pts}p</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// PAGE JOUEURS
// ═══════════════════════════════════════════════════
function PPlayers() {
  const [sel, setSel] = useState(null);
  const [search, setSearch] = useState("");
  const [ptab, setPtab] = useState("stats");
  const [cmp, setCmp] = useState([]);
  const filtered = PLAYERS.filter(p=>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.country.toLowerCase().includes(search.toLowerCase())
  );

  if(cmp.length===2) {
    const [p1,p2] = cmp;
    return (
      <div className="fu">
        <div style={{background:T.bg,padding:"14px 16px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:12}}>
          <button onClick={()=>setCmp([])} style={{background:T.s2,border:"none",borderRadius:20,padding:"6px 14px",color:T.white,fontSize:12,fontWeight:700,cursor:"pointer"}}>← Retour</button>
          <span style={{fontSize:14,fontWeight:800,color:T.white}}>Comparaison</span>
        </div>
        <div style={{padding:"14px"}}>
          <div style={{background:T.s,borderRadius:14,padding:16,border:`1px solid ${T.border}`,marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
              {[p1,p2].map((p,i)=>(
                <div key={p.id} style={{textAlign:"center"}}>
                  <div style={{width:56,height:56,borderRadius:"50%",background:T.s2,border:`3px solid ${i===0?T.blue:T.gold}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,margin:"0 auto 8px"}}>{p.flag}</div>
                  <div style={{fontSize:14,fontWeight:800,color:T.white}}>{p.name.split(" ").pop()}</div>
                  <div style={{fontSize:11,color:T.grey}}>{p.country}</div>
                </div>
              ))}
            </div>
          </div>
          {[{l:"Matchs",k:"matches"},{l:"Buts",k:"goals"},{l:"Passes déc.",k:"assists"},{l:"Tirs",k:"shots"}].map(stat=>{
            const v1=p1[stat.k], v2=p2[stat.k], mx=Math.max(v1,v2,1);
            return (
              <div key={stat.l} style={{background:T.s,borderRadius:12,padding:"12px 14px",marginBottom:8,border:`1px solid ${T.border}`}}>
                <div style={{fontSize:11,fontWeight:700,color:T.grey,textAlign:"center",marginBottom:10}}>{stat.l}</div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:16,fontWeight:900,color:v1>v2?T.gold:T.white,width:28,textAlign:"right"}}>{v1}</span>
                  <div style={{flex:1,display:"flex",flexDirection:"column",gap:4}}>
                    <div style={{height:6,background:T.s2,borderRadius:3,overflow:"hidden",direction:"rtl"}}><div style={{width:`${(v1/mx)*100}%`,height:"100%",background:T.blue,borderRadius:3}}/></div>
                    <div style={{height:6,background:T.s2,borderRadius:3,overflow:"hidden"}}><div style={{width:`${(v2/mx)*100}%`,height:"100%",background:T.gold,borderRadius:3}}/></div>
                  </div>
                  <span style={{fontSize:16,fontWeight:900,color:v2>v1?T.gold:T.white,width:28}}>{v2}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if(sel) {
    const p = sel;
    return (
      <div className="fu">
        <div style={{background:"linear-gradient(160deg,#0d2a5e,#060d1f)",padding:"16px 16px 20px"}}>
          <button onClick={()=>setSel(null)} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:20,padding:"6px 14px",color:T.white,fontSize:12,fontWeight:700,cursor:"pointer",marginBottom:14}}>← Retour</button>
          <div style={{display:"flex",gap:14,alignItems:"center"}}>
            <div style={{width:64,height:64,borderRadius:"50%",background:T.s2,border:`3px solid ${p.country==="Senegal"?T.sen:T.blue}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,flexShrink:0}}>{p.flag}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:20,fontWeight:900,color:T.white}}>{p.name}</div>
              <div style={{fontSize:12,color:T.grey,marginTop:3}}>{p.country} · {p.club} · #{p.num}</div>
              <div style={{display:"flex",gap:6,marginTop:6}}><Bdg label={p.pos} color={p.country==="Senegal"?T.sen:T.bl}/><Bdg label={`${p.age} ans`} color={T.grey}/></div>
            </div>
          </div>
        </div>
        <div style={{display:"flex",borderBottom:`1px solid ${T.border}`,background:T.bg,position:"sticky",top:0,zIndex:10}}>
          {["stats","bio","mondial","carrière"].map(t=>(
            <button key={t} onClick={()=>setPtab(t)} style={{flex:1,background:"none",border:"none",color:ptab===t?T.white:T.grey,fontWeight:ptab===t?800:400,fontSize:12,padding:"10px 0",borderBottom:ptab===t?`2px solid ${T.blue}`:"2px solid transparent",cursor:"pointer",textTransform:"capitalize"}}>{t}</button>
          ))}
        </div>
        <div style={{padding:"14px"}}>
          {ptab==="stats" && (
            <div>
              <div style={{background:T.s,borderRadius:14,overflow:"hidden",border:`1px solid ${T.border}`,marginBottom:12}}>
                <div style={{padding:"10px 14px",borderBottom:`1px solid ${T.border}`}}><span style={{fontSize:12,fontWeight:700,color:T.white}}>📊 Stats · World Cup 2026</span></div>
                {[{l:"Matchs joués",v:p.matches,mx:7,i:"⚽",c:T.bl},{l:"Buts",v:p.goals,mx:10,i:"🥅",c:T.gold},{l:"Passes déc.",v:p.assists,mx:10,i:"🎯",c:T.green},{l:"Tirs",v:p.shots,mx:30,i:"💥",c:T.live}].map((s,i)=>(
                  <div key={s.l} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",borderTop:i>0?`1px solid ${T.border}`:"none"}}>
                    <span style={{fontSize:16,width:24}}>{s.i}</span>
                    <span style={{fontSize:13,color:T.grey,flex:1}}>{s.l}</span>
                    <div style={{flex:1,height:5,background:T.s2,borderRadius:3,overflow:"hidden"}}><div style={{width:`${Math.min(100,(s.v/s.mx)*100)}%`,height:"100%",background:s.c,borderRadius:3}}/></div>
                    <span style={{fontSize:15,fontWeight:900,color:s.c,minWidth:28,textAlign:"right"}}>{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {ptab==="bio" && (
            <div style={{background:T.s,borderRadius:14,padding:"14px 16px",border:`1px solid ${T.border}`}}>
              <div style={{fontSize:13,color:"#e5e7eb",lineHeight:1.7}}>{p.bio}</div>
            </div>
          )}
          {ptab==="mondial" && (
            <div style={{background:T.s,borderRadius:14,overflow:"hidden",border:`1px solid ${T.border}`}}>
              <div style={{padding:"10px 14px",borderBottom:`1px solid ${T.border}`}}><span style={{fontSize:12,fontWeight:700,color:T.white}}>🏆 Palmarès Coupe du Monde</span></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr"}}>
                {[{l:"Participations",v:p.wc.apps},{l:"Buts",v:p.wc.goals},{l:"Passes déc.",v:p.wc.assists}].map((s,i)=>(
                  <div key={s.l} style={{padding:"14px 8px",borderRight:i<2?`1px solid ${T.border}`:"none",textAlign:"center"}}>
                    <div style={{fontSize:20,fontWeight:900,color:T.gold}}>{s.v}</div>
                    <div style={{fontSize:10,color:T.grey,marginTop:4}}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {ptab==="carrière" && (
            <div style={{background:T.s,borderRadius:14,overflow:"hidden",border:`1px solid ${T.border}`}}>
              {p.career.map((c,i)=>(
                <div key={i} style={{padding:"14px",borderBottom:i<p.career.length-1?`1px solid ${T.border}`:"none",display:"flex",gap:12}}>
                  <div style={{background:T.blue,borderRadius:8,padding:"4px 8px",flexShrink:0,height:"fit-content"}}><span style={{fontSize:11,fontWeight:800,color:T.white}}>{c.year}</span></div>
                  <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:T.white,lineHeight:1.4}}>{c.event}</div><div style={{fontSize:11,color:T.gold,marginTop:4}}>{c.goals} buts</div></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fu">
      <div style={{background:T.bg,position:"sticky",top:0,zIndex:20,borderBottom:`1px solid ${T.border}`,padding:"14px 16px 12px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <span style={{fontSize:16,fontWeight:900,color:T.white}}>⭐ Joueurs</span>
          {cmp.length===1 && <button onClick={()=>setCmp([])} style={{background:T.s2,border:"none",borderRadius:20,padding:"5px 12px",color:T.grey,fontSize:11,cursor:"pointer"}}>Annuler VS</button>}
        </div>
        <div style={{background:T.s2,borderRadius:10,padding:"9px 12px",display:"flex",alignItems:"center",gap:8,border:`1px solid ${T.border}`}}>
          {IC.srch(T.grey)}
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher un joueur ou pays..." style={{background:"none",border:"none",color:T.white,flex:1,outline:"none"}}/>
        </div>
      </div>
      <div style={{padding:"10px 14px"}}>
        {cmp.length===1 && <div style={{background:"rgba(245,158,11,0.08)",borderRadius:10,padding:"10px 14px",marginBottom:10,border:"1px solid rgba(245,158,11,0.2)"}}><span style={{fontSize:12,color:T.gold,fontWeight:700}}>🔄 Sélectionne un 2e joueur pour comparer avec {cmp[0].name}</span></div>}
        {filtered.map(p=>(
          <div key={p.id} style={{background:p.country==="Senegal"?"rgba(0,179,89,0.04)":T.s,borderRadius:14,padding:"14px",marginBottom:8,border:`1px solid ${p.country==="Senegal"?"rgba(0,179,89,0.3)":T.border}`,display:"flex",alignItems:"center",gap:12}}>
            <div onClick={()=>{setSel(p);setPtab("stats");}} style={{display:"flex",alignItems:"center",gap:12,flex:1,cursor:"pointer"}}>
              <div style={{width:44,height:44,borderRadius:"50%",background:T.s2,border:`2px solid ${p.country==="Senegal"?T.sen:T.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{p.flag}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:800,color:p.country==="Senegal"?T.sen:T.white}}>{p.name}</div>
                <div style={{fontSize:11,color:T.grey,marginTop:2}}>{p.country} · {p.club} · {p.pos}</div>
                {p.goals>0&&<div style={{fontSize:11,color:T.gold,marginTop:2}}>⚽ {p.goals} but{p.goals>1?"s":""} ce Mondial</div>}
              </div>
            </div>
            <button onClick={()=>{if(cmp.length===0)setCmp([p]);else if(cmp.length===1&&cmp[0].id!==p.id)setCmp([cmp[0],p]);}}
              style={{background:cmp.find(c=>c.id===p.id)?"rgba(245,158,11,0.2)":T.s2,border:`1px solid ${cmp.find(c=>c.id===p.id)?T.gold:T.border}`,borderRadius:8,padding:"6px 10px",cursor:"pointer",fontSize:11,color:cmp.find(c=>c.id===p.id)?T.gold:T.grey,fontWeight:700,flexShrink:0}}>VS</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// PAGE HISTOIRE
// ═══════════════════════════════════════════════════
function PHistory() {
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState("palmares");
  const [dtab, setDtab] = useState("stats");

  if(sel) {
    const h = sel;
    return (
      <div className="fu">
        <div style={{background:"linear-gradient(160deg,#0d2a5e,#060d1f)",padding:"16px 16px 20px"}}>
          <button onClick={()=>setSel(null)} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:20,padding:"6px 14px",color:T.white,fontSize:12,fontWeight:700,cursor:"pointer",marginBottom:14}}>← Retour</button>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:64,height:64,borderRadius:"50%",background:"rgba(29,78,216,0.2)",border:`2px solid ${T.blue}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <span style={{fontSize:10,fontWeight:900,color:T.bl}}>{h.year}</span>
            </div>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:26}}>{h.wf}</span><span style={{fontSize:20,fontWeight:900,color:T.white}}>{h.winner}</span><Bdg label="🏆" color={T.gold}/></div>
              <div style={{fontSize:12,color:T.grey,marginTop:3}}>{h.host} · {h.teams} équipes</div>
            </div>
          </div>
        </div>
        <div style={{display:"flex",borderBottom:`1px solid ${T.border}`,background:T.bg}}>
          {[{k:"stats",l:"📊 Stats"},{k:"scorers",l:"⚽ Buteurs"},{k:"matches",l:"🗓 Matchs"}].map(t=>(
            <button key={t.k} onClick={()=>setDtab(t.k)} style={{flex:1,background:"none",border:"none",color:dtab===t.k?T.white:T.grey,fontWeight:dtab===t.k?800:400,fontSize:10,padding:"10px 2px",borderBottom:dtab===t.k?`2px solid ${T.blue}`:"2px solid transparent",cursor:"pointer"}}>{t.l}</button>
          ))}
        </div>
        <div style={{padding:"14px"}}>
          {dtab==="stats" && (
            <div style={{background:T.s,borderRadius:14,overflow:"hidden",border:`1px solid ${T.border}`}}>
              {[{l:"Champion",v:`${h.wf} ${h.winner}`},{l:"Finaliste",v:`${h.rf} ${h.ru}`},{l:"Score finale",v:h.final},{l:"Buts total",v:h.goals},{l:"Équipes",v:h.teams+" nations"},{l:"Pays hôte",v:h.host}].map((s,i)=>(
                <div key={s.l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 14px",borderBottom:i<5?`1px solid ${T.border}`:"none"}}>
                  <span style={{fontSize:13,color:T.grey}}>{s.l}</span>
                  <span style={{fontSize:13,fontWeight:700,color:T.white,textAlign:"right",maxWidth:"55%"}}>{s.v}</span>
                </div>
              ))}
            </div>
          )}
          {dtab==="scorers" && (
            <div style={{background:T.s,borderRadius:14,overflow:"hidden",border:`1px solid ${T.border}`}}>
              <div style={{padding:"10px 14px",borderBottom:`1px solid ${T.border}`}}><span style={{fontSize:12,fontWeight:800,color:T.white}}>⚽ Meilleurs buteurs</span></div>
              {h.scorers.map((s,i)=>(
                <div key={s.n} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderTop:i>0?`1px solid ${T.border}`:"none"}}>
                  <div style={{width:24,height:24,borderRadius:"50%",background:i===0?"rgba(245,158,11,0.2)":T.s2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:i===0?T.gold:T.grey}}>{i+1}</div>
                  <span style={{fontSize:20}}>{s.f}</span>
                  <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:T.white}}>{s.n}</div></div>
                  <div style={{textAlign:"center"}}><div style={{fontSize:18,fontWeight:900,color:T.gold}}>{s.g}</div><div style={{fontSize:9,color:T.grey}}>buts</div></div>
                </div>
              ))}
            </div>
          )}
          {dtab==="matches" && (
            <div style={{background:T.s,borderRadius:14,overflow:"hidden",border:`1px solid ${T.border}`}}>
              {h.matches.map((m,i)=>(
                <div key={i} style={{padding:"14px",borderTop:i>0?`1px solid ${T.border}`:"none"}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                    <Bdg label={m.r} color={m.r==="Finale"?T.gold:T.bl}/>
                    {m.d && <span style={{fontSize:11,color:T.grey,fontStyle:"italic"}}>{m.d}</span>}
                  </div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{flex:1,display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:22}}>{m.hf}</span><span style={{fontSize:13,fontWeight:700,color:T.white}}>{m.h}</span></div>
                    <div style={{background:T.s2,borderRadius:8,padding:"6px 14px",fontWeight:900,fontSize:18,color:T.white,letterSpacing:4}}>{m.s}</div>
                    <div style={{flex:1,display:"flex",alignItems:"center",gap:8,justifyContent:"flex-end"}}><span style={{fontSize:13,fontWeight:700,color:T.white,textAlign:"right"}}>{m.a}</span><span style={{fontSize:22}}>{m.af}</span></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fu">
      <div style={{background:T.bg,position:"sticky",top:0,zIndex:20,borderBottom:`1px solid ${T.border}`,padding:"14px 16px 0"}}>
        <div style={{fontSize:16,fontWeight:900,color:T.white,marginBottom:14}}>📖 Histoire de la Coupe du Monde</div>
        <div style={{display:"flex",borderBottom:`1px solid ${T.border}`}}>
          {[{k:"palmares",l:"🏆 Palmarès"},{k:"records",l:"🎖️ Records"}].map(t=>(
            <button key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,background:"none",border:"none",color:tab===t.k?T.white:T.grey,fontWeight:tab===t.k?800:400,fontSize:12,padding:"8px 0",borderBottom:tab===t.k?`2px solid ${T.blue}`:"2px solid transparent",cursor:"pointer"}}>{t.l}</button>
          ))}
        </div>
      </div>
      {tab==="palmares" && (
        <div style={{padding:"10px 14px"}}>
          {HISTORY.map(h=>(
            <div key={h.year} onClick={()=>{setSel(h);setDtab("stats");}} style={{background:T.s,borderRadius:14,padding:"14px",marginBottom:8,border:`1px solid ${T.border}`,cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:46,height:46,borderRadius:"50%",background:"rgba(29,78,216,0.15)",border:`2px solid ${T.blue}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:11,fontWeight:900,color:T.bl}}>{h.year}</span></div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:18}}>{h.wf}</span><span style={{fontSize:14,fontWeight:800,color:T.white}}>{h.winner}</span><Bdg label="🏆" color={T.gold}/></div>
                <div style={{fontSize:11,color:T.grey,marginTop:3}}>{h.host} · {h.teams} équipes · {h.goals} buts</div>
              </div>
              <span style={{fontSize:16,color:T.grey}}>›</span>
            </div>
          ))}
        </div>
      )}
      {tab==="records" && (
        <div style={{padding:"10px 14px"}}>
          {RECORDS.map((r,i)=>(
            <div key={i} style={{background:T.s,borderRadius:14,padding:"16px",marginBottom:8,border:`1px solid ${T.border}`,display:"flex",gap:14,alignItems:"center"}}>
              <div style={{background:"rgba(245,158,11,0.12)",borderRadius:12,width:52,height:52,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",border:"1px solid rgba(245,158,11,0.25)",flexShrink:0}}>
                <div style={{fontSize:16}}>{r.i}</div>
                <span style={{fontSize:12,fontWeight:900,color:T.gold,lineHeight:1}}>{r.v}</span>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:800,color:T.white}}>{r.l}</div>
                <div style={{fontSize:12,color:T.gold,marginTop:3,fontWeight:600}}>{r.h}</div>
                <div style={{fontSize:11,color:T.grey,marginTop:2}}>{r.d}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
// PAGE STADES
// ═══════════════════════════════════════════════════
function PStadiums({matches=MATCHES}) {
  const [sel, setSel] = useState(null);
  const [cf, setCf] = useState("Tous");
  const filtered = VENUES.filter(v=>cf==="Tous"||(cf==="🇺🇸"&&v.flag==="🇺🇸")||(cf==="🇲🇽"&&v.flag==="🇲🇽")||(cf==="🇨🇦"&&v.flag==="🇨🇦"));

  if(sel) {
    const v = sel;
    const vms = matches.filter(m=>m.stadium===v.name);
    return (
      <div className="fu">
        <div style={{background:"linear-gradient(160deg,#0d2a5e,#060d1f)",padding:"16px 16px 20px"}}>
          <button onClick={()=>setSel(null)} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:20,padding:"6px 14px",color:T.white,fontSize:12,fontWeight:700,cursor:"pointer",marginBottom:14}}>← Retour</button>
          <div style={{fontSize:36,marginBottom:10}}>🏟️</div>
          <div style={{fontSize:20,fontWeight:900,color:T.white}}>{v.name}</div>
          <div style={{fontSize:13,color:T.grey,marginTop:4}}>📍 {v.city} {v.flag}</div>
          {v.host && <div style={{marginTop:8}}><Bdg label={v.host} color={T.gold}/></div>}
          <div style={{display:"flex",gap:0,marginTop:16,background:"rgba(255,255,255,0.06)",borderRadius:12,overflow:"hidden"}}>
            {[{v:v.cap,l:"Capacité"},{v:v.matches,l:"Matchs"},{v:v.flag==="🇺🇸"?"USA":v.flag==="🇲🇽"?"Mexique":"Canada",l:"Pays"}].map((s,i)=>(
              <div key={s.l} style={{flex:1,textAlign:"center",padding:"10px 4px",borderRight:i<2?"1px solid rgba(255,255,255,0.08)":"none"}}>
                <div style={{fontSize:14,fontWeight:900,color:T.white}}>{s.v}</div>
                <div style={{fontSize:9,color:"rgba(255,255,255,0.4)",fontWeight:600,marginTop:2}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{padding:"14px"}}>
          {vms.length>0 ? (
            <div>
              <div style={{fontSize:12,fontWeight:700,color:T.grey,marginBottom:10}}>MATCHS DANS CE STADE</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>{vms.map(m=><MCard key={m.id} m={m}/>)}</div>
            </div>
          ) : (
            <div style={{background:T.s,borderRadius:14,padding:30,textAlign:"center",border:`1px solid ${T.border}`}}><div style={{fontSize:32,marginBottom:10}}>📅</div><div style={{fontSize:14,color:T.grey}}>Matchs à confirmer</div></div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fu">
      <div style={{background:T.bg,position:"sticky",top:0,zIndex:20,borderBottom:`1px solid ${T.border}`,padding:"14px 16px 10px"}}>
        <div style={{fontSize:16,fontWeight:900,color:T.white,marginBottom:12}}>🏟️ Stades · World Cup 2026</div>
        <div style={{display:"flex",gap:8,overflowX:"auto",scrollbarWidth:"none"}}>
          {[{k:"Tous",l:"Tous"},{k:"🇺🇸",l:"🇺🇸 USA"},{k:"🇲🇽",l:"🇲🇽 México"},{k:"🇨🇦",l:"🇨🇦 Canada"}].map(c=>(
            <button key={c.k} onClick={()=>setCf(c.k)} style={{background:cf===c.k?T.blue:T.s2,color:cf===c.k?T.white:T.grey,border:"none",borderRadius:20,padding:"5px 14px",fontSize:11,fontWeight:700,cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}}>{c.l}</button>
          ))}
        </div>
      </div>
      <div style={{padding:"10px 14px"}}>
        {filtered.map(v=>(
          <div key={v.name} onClick={()=>setSel(v)} style={{background:T.s,borderRadius:14,padding:"14px",marginBottom:8,border:`1px solid ${T.border}`,cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:52,height:52,background:T.s2,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>🏟️</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:14,color:T.white}}>{v.name}</div>
              <div style={{fontSize:11,color:T.grey,marginTop:2}}>📍 {v.city} {v.flag}</div>
              {v.host && <div style={{marginTop:4}}><Bdg label={v.host} color={T.gold}/></div>}
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <div style={{fontSize:13,fontWeight:700,color:T.gold}}>{v.cap}</div>
              <div style={{fontSize:10,color:T.grey}}>{v.matches} matchs</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// PAGE PRONOSTICS
// ═══════════════════════════════════════════════════
function PPlay({matches=MATCHES}) {
  const [pronos, setPronos] = useState(() => {
    try { return JSON.parse(localStorage.getItem("xaritsoccer_pronos") || "{}"); } catch { return {}; }
  });
  const [saved, setSaved] = useState({});
  const [tab, setTab] = useState("pronos");

  const save = (id,data) => {
    setPronos(p => {
      const next = {...p,[id]:data};
      try { localStorage.setItem("xaritsoccer_pronos", JSON.stringify(next)); } catch {}
      return next;
    });
    setSaved(s=>({...s,[id]:true}));
    setTimeout(()=>setSaved(s=>({...s,[id]:false})),2000);
  };

  const total = Object.keys(pronos).length;
  const pts = Object.values(pronos).filter(p=>p.result).length;

  return (
    <div className="fu">
      <div style={{background:T.bg,position:"sticky",top:0,zIndex:20,borderBottom:`1px solid ${T.border}`,padding:"14px 16px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <span style={{fontSize:16,fontWeight:900,color:T.white}}>🎯 Pronostics</span>
          <div style={{display:"flex",gap:6}}><Bdg label={`${total} pronos`} color={T.gold}/><Bdg label={`${pts} pts`} color={T.green}/></div>
        </div>
        <div style={{display:"flex"}}>
          {[{k:"pronos",l:"Mes pronos"},{k:"stats",l:"📊 Stats"}].map(t=>(
            <button key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,background:"none",border:"none",cursor:"pointer",color:tab===t.k?T.white:T.grey,fontWeight:tab===t.k?800:400,fontSize:12,padding:"8px 0",borderBottom:tab===t.k?`2px solid ${T.blue}`:"2px solid transparent"}}>{t.l}</button>
          ))}
        </div>
      </div>
      {tab==="pronos" && (
        <div style={{padding:"12px 14px"}}>
          {matches.map(m=>{
            const p = pronos[m.id]||{};
            const isSen = m.isSenegal;
            return (
              <div key={m.id} style={{background:T.s,borderRadius:14,overflow:"hidden",border:`1px solid ${isSen?"rgba(0,179,89,0.35)":T.border}`,marginBottom:10}}>
                <div style={{padding:"10px 14px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}><Bdg label={`GR. ${m.group}`} color={isSen?T.sen:T.bl}/><span style={{fontSize:11,color:T.grey}}>{m.date}</span></div>
                  {saved[m.id] && <Bdg label="✓ Sauvegardé" color={T.green}/>}
                  {m.status==="finished" && <Bdg label="Terminé" color={T.grey}/>}
                </div>
                <div style={{padding:"14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{flex:1,textAlign:"center"}}><Fl f={m.hf} s={32}/><div style={{fontSize:12,fontWeight:700,color:isSen&&m.home==="Senegal"?T.sen:T.white,marginTop:6}}>{m.home}</div></div>
                  <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                    {m.status==="finished"
                      ? <div style={{fontSize:22,fontWeight:900,color:T.grey,letterSpacing:4}}>{m.hs} – {m.as}</div>
                      : <>
                          <input type="number" min="0" max="20" value={p.hs??""} onChange={e=>save(m.id,{...p,hs:e.target.value})} style={{width:44,height:44,background:T.s2,border:`1px solid ${T.border}`,borderRadius:10,color:T.white,fontSize:20,fontWeight:900,textAlign:"center",outline:"none"}}/>
                          <span style={{fontSize:14,color:T.grey}}>–</span>
                          <input type="number" min="0" max="20" value={p.as??""} onChange={e=>save(m.id,{...p,as:e.target.value})} style={{width:44,height:44,background:T.s2,border:`1px solid ${T.border}`,borderRadius:10,color:T.white,fontSize:20,fontWeight:900,textAlign:"center",outline:"none"}}/>
                        </>}
                  </div>
                  <div style={{flex:1,textAlign:"center"}}><Fl f={m.af} s={32}/><div style={{fontSize:12,fontWeight:700,color:isSen&&m.away==="Senegal"?T.sen:T.white,marginTop:6}}>{m.away}</div></div>
                </div>
                {m.status!=="finished" && (
                  <div style={{display:"flex",borderTop:`1px solid ${T.border}`}}>
                    {[{v:"home",l:m.home},{v:"draw",l:"Nul"},{v:"away",l:m.away}].map(opt=>(
                      <button key={opt.v} onClick={()=>save(m.id,{...p,result:opt.v})} style={{flex:1,padding:"9px 4px",background:p.result===opt.v?T.blue:T.s2,color:p.result===opt.v?T.white:T.grey,border:"none",fontSize:10,fontWeight:p.result===opt.v?800:500,cursor:"pointer",borderRight:`1px solid ${T.border}`}}>{opt.l}</button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {tab==="stats" && (
        <div style={{padding:"14px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {[{l:"Pronos soumis",v:total,i:"🎯",c:T.gold},{l:"Points",v:pts,i:"⭐",c:T.green}].map(s=>(
              <div key={s.l} style={{background:T.s,borderRadius:12,padding:14,border:`1px solid ${T.border}`,textAlign:"center"}}><div style={{fontSize:22,marginBottom:4}}>{s.i}</div><div style={{fontSize:22,fontWeight:900,color:s.c}}>{s.v}</div><div style={{fontSize:11,color:T.grey}}>{s.l}</div></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
// NAV
// ═══════════════════════════════════════════════════
const NAV = [
  {key:"home",label:"Accueil",icon:IC.home},
  {key:"matches",label:"Matchs",icon:IC.ball},
  {key:"groups",label:"Groupes",icon:IC.grid},
  {key:"players",label:"Joueurs",icon:IC.users},
  {key:"history",label:"Histoire",icon:IC.book},
  {key:"stadiums",label:"Stades",icon:IC.stad},
  {key:"pronos",label:"Pronos",icon:IC.tgt},
];

function FloatingNav({page,setPage}) {
  const [scrolled,setScrolled] = useState(false);
  const [hidden,setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(()=>{
    const el = document.getElementById("appscroll");
    if(!el) return;
    const fn = () => {
      const y = el.scrollTop;
      setScrolled(y>50);
      if(y>lastY.current+15&&y>100) setHidden(true);
      else if(y<lastY.current-10) setHidden(false);
      lastY.current = y;
    };
    el.addEventListener("scroll",fn,{passive:true});
    return()=>el.removeEventListener("scroll",fn);
  },[]);

  const compact = scrolled&&!hidden;
  return (
    <div style={{position:"fixed",bottom:hidden?-100:compact?16:0,left:"50%",transform:"translateX(-50%)",width:compact?"auto":"100%",maxWidth:compact?380:480,zIndex:100,display:"flex",justifyContent:"center",transition:"all 0.35s cubic-bezier(0.34,1.56,0.64,1)"}}>
      <div style={{background:compact?"rgba(18,24,38,0.95)":"rgba(6,10,20,0.98)",backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",borderRadius:compact?50:0,border:compact?"1px solid rgba(255,255,255,0.08)":`1px solid ${T.border}`,boxShadow:compact?"0 8px 32px rgba(0,0,0,0.55)":"none",display:"flex",alignItems:"center",padding:compact?"7px 8px":"8px 0 max(12px,env(safe-area-inset-bottom))",gap:compact?2:0,width:compact?"auto":"100%",transition:"all 0.35s cubic-bezier(0.34,1.56,0.64,1)"}}>
        {NAV.map((n,i)=>{
          const active = page===i;
          return (
            <button key={n.key} onClick={()=>setPage(i)} style={{background:active&&compact?"rgba(29,78,216,0.25)":"none",border:"none",cursor:"pointer",display:"flex",flexDirection:compact?"row":"column",alignItems:"center",justifyContent:"center",flex:compact?"0 0 auto":1,padding:compact?(active?"7px 12px":"7px 8px"):"4px 0",borderRadius:compact?40:0,transition:"all 0.2s ease",gap:compact?0:3}}>
              {n.icon(active,T.bl)}
              {!compact && (
                <>
                  <span style={{fontSize:8,fontWeight:active?800:400,color:active?T.bl:T.g2,letterSpacing:.2,marginTop:1}}>{n.label}</span>
                  {active && <div style={{width:14,height:2,background:T.blue,borderRadius:1}}/>}
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// ONBOARDING
// ═══════════════════════════════════════════════════
function Onboarding({onDone}) {
  const [step, setStep] = useState(0);
  const [fav, setFav] = useState(null);

  const TEAMS = [
    {n:"Senegal",f:"🇸🇳"},{n:"France",f:"🇫🇷"},{n:"Brazil",f:"🇧🇷"},{n:"Argentina",f:"🇦🇷"},
    {n:"Spain",f:"🇪🇸"},{n:"Germany",f:"🇩🇪"},{n:"Portugal",f:"🇵🇹"},{n:"England",f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿"},
    {n:"Morocco",f:"🇲🇦"},{n:"Norway",f:"🇳🇴"},{n:"USA",f:"🇺🇸"},{n:"Japan",f:"🇯🇵"},
  ];

  if(step===0) return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d2a5e,#060d1f)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
      <style>{css}</style>
      <div style={{fontSize:60,marginBottom:16}}>🏆</div>
      <div style={{fontSize:28,fontWeight:900,color:"white",textAlign:"center",marginBottom:8}}>FIFA World Cup 2026</div>
      <div style={{fontSize:14,color:"rgba(255,255,255,0.5)",textAlign:"center",marginBottom:32}}>USA · Canada · México · 11 Jun – 19 Jul</div>
      <div style={{display:"flex",gap:0,background:"rgba(255,255,255,0.06)",borderRadius:14,overflow:"hidden",marginBottom:32,width:"100%",maxWidth:320}}>
        {[{v:"48",l:"Équipes"},{v:"104",l:"Matchs"},{v:"16",l:"Stades"}].map((s,i)=>(
          <div key={s.l} style={{flex:1,textAlign:"center",padding:"14px 4px",borderRight:i<2?"1px solid rgba(255,255,255,0.08)":"none"}}>
            <div style={{fontSize:22,fontWeight:900,color:T.gold}}>{s.v}</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.4)",fontWeight:600,marginTop:2}}>{s.l.toUpperCase()}</div>
          </div>
        ))}
      </div>
      <button onClick={()=>setStep(1)} style={{background:T.blue,border:"none",borderRadius:16,padding:"16px 48px",color:"white",fontWeight:900,fontSize:16,cursor:"pointer",boxShadow:"0 4px 20px rgba(29,78,216,.4)"}}>
        🚀 Commencer
      </button>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:T.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
      <style>{css}</style>
      <div className="fu" style={{width:"100%",maxWidth:400,textAlign:"center"}}>
        <div style={{fontSize:24,fontWeight:900,color:T.white,marginBottom:6}}>Ton équipe favorite ?</div>
        <div style={{fontSize:13,color:T.grey,marginBottom:24}}>Tes matchs seront mis en avant 🎯</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:28}}>
          {TEAMS.map(t=>(
            <button key={t.n} onClick={()=>setFav(t.n)} style={{background:fav===t.n?"rgba(29,78,216,0.2)":T.s,border:fav===t.n?`2px solid ${T.blue}`:`1px solid ${T.border}`,borderRadius:12,padding:"12px 6px",cursor:"pointer",textAlign:"center",transform:fav===t.n?"scale(1.05)":"scale(1)",transition:"all 0.2s"}}>
              <div style={{fontSize:28,marginBottom:4}}>{t.f}</div>
              <div style={{fontSize:10,fontWeight:fav===t.n?800:500,color:fav===t.n?T.bl:T.white}}>{t.n}</div>
            </button>
          ))}
        </div>
        <button onClick={()=>fav&&onDone(fav)} style={{background:fav?T.blue:T.s2,border:"none",borderRadius:14,padding:"14px 40px",color:fav?T.white:T.grey,fontWeight:800,fontSize:15,cursor:fav?"pointer":"default",width:"100%",boxShadow:fav?"0 4px 20px rgba(29,78,216,.4)":"none"}}>
          Entrer dans l'application 🚀
        </button>
        <button onClick={()=>onDone("Senegal")} style={{background:"none",border:"none",color:T.grey,fontSize:12,cursor:"pointer",marginTop:14}}>Passer (Sénégal par défaut)</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════════
export default function App() {
  const [onboarded, setOnboarded] = useState(() => {
    try { return localStorage.getItem("xaritsoccer_onboarded") === "1"; } catch { return false; }
  });
  const [fav, setFav] = useState(() => {
    try { return localStorage.getItem("xaritsoccer_fav") || "Senegal"; } catch { return "Senegal"; }
  });
  const [page, setPage] = useState(0);
  const { liveData, allMatches, standings, scorers, apiOnline } = useLiveMatches();

  // Liste réelle si l'API a répondu, sinon fallback statique minimal (jamais affiché comme "live")
  const matches = allMatches.length > 0 ? allMatches : MATCHES;

  if(!onboarded) return (
    <Onboarding onDone={(team)=>{
      const t = team||"Senegal";
      setFav(t);
      setOnboarded(true);
      try {
        localStorage.setItem("xaritsoccer_fav", t);
        localStorage.setItem("xaritsoccer_onboarded", "1");
      } catch {}
    }}/>
  );

  return (
    <div style={{minHeight:"100vh",background:T.bg,color:"#e5e7eb",fontFamily:"'Inter','SF Pro Display','Segoe UI',system-ui,sans-serif",maxWidth:480,margin:"0 auto",position:"relative"}}>
      <style>{css}</style>
      <div id="appscroll" style={{height:"100vh",overflowY:"auto",overflowX:"hidden",overscrollBehaviorY:"contain",WebkitOverflowScrolling:"touch"}}>
        <Ticker liveData={liveData} matches={matches}/>
        <div style={{paddingBottom:100}}>
          {page===0 && <PHome setPage={setPage} fav={fav} liveData={liveData} scorers={scorers} matches={matches}/>}
          {page===1 && <PMatches fav={fav} liveData={liveData} matches={matches}/>}
          {page===2 && <PGroups standings={standings}/>}
          {page===3 && <PPlayers/>}
          {page===4 && <PHistory/>}
          {page===5 && <PStadiums matches={matches}/>}
          {page===6 && <PPlay matches={matches}/>}
        </div>
      </div>
      <FloatingNav page={page} setPage={setPage}/>
    </div>
  );
}
