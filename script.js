const url = "https://babushka-dd8a.restdb.io/rest/menu";
const options = {
  headers: {
    "x-apikey": "600ec2fb1346a1524ff12de4",
  },
};
let data;
let filter = "alle";

const header = document.querySelector(".viskategorier");
const filterKnapper = document.querySelectorAll("nav button");
filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerRetter));
hentData;

function filtrerRetter() {
  filter = this.dataset.kategori;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  vis(data);
  header.textContent = this.textContent;
}

async function hentData() {
  const respons = await fetch(url, options);
  data = await respons.json();
  vis(data);
}

function vis() {
  const main = document.querySelector("main");
  const template = document.querySelector("template").content;
  main.textContent = "";

  data.forEach((ret) => {
    console.log("kategori", ret.kategori);
    if (filter == ret.kategori || filter == "alle") {
      const klon = template.cloneNode(true);

      klon.querySelector(".billedurl").src = "medium/" + ret.billednavn + "-md.jpg";
      klon.querySelector(".titel").textContent = ret.navn;
      klon.querySelector(".beskrivelse").textContent = ret.kortbeskrivelse;
      klon.querySelector(".pris").textContent = ret.pris + ":-";
      klon.querySelector("article").addEventListener("click", () => visRet(ret));
      main.appendChild(klon);
    }
  });
}

document.querySelector("#popup").addEventListener("click", () => (popup.style.display = "none"));

function visRet(visOplysninger) {
  console.log("visOplysninger");
  const popup = document.querySelector("#popup");
  popup.style.display = "flex";
  popup.querySelector("h2").textContent = visOplysninger.navn;
  popup.querySelector("#langbeskrivelse").textContent = visOplysninger.langbeskrivelse;
  popup.querySelector("#pris").textContent = visOplysninger.pris + ":-";
  popup.querySelector(".stort_billede").src = "medium/" + visOplysninger.billednavn + "-md.jpg";
}
hentData();
