import navbar from "../components/navbar.js";
import { footer } from "../components/footer.js";
let navBar = document.getElementById("navbar");
navBar.innerHTML = navbar();
let footerDiv = document.getElementById("footer_div");
footerDiv.innerHTML = footer();

let hide_me = document.querySelector("#log_in_text");
hide_me.style.display = "none";

let hide_me_also = document.querySelector("#join_for_free");
hide_me_also.style.display = "none";

let input_term = JSON.parse(localStorage.getItem("query"));
let counting;

let url = `http://localhost:5000/courses?name=${input_term}`;

const search_data = async (url) => {
  try {
    let res = await fetch(url);

    let data = await res.json();

    pagination(data);
    console.log(data);
    append_data2(data);
  } catch (error) {
    console.log(error);
  }
};

search_data(url);

let filter_checkbox = document.querySelectorAll(".filter-checkbox");

for (let checkbox of filter_checkbox) {
  checkbox.addEventListener("click", function () {
    if (this.checked == true) {
      // console.log("checked");

      var url = `http://localhost:5000/courses/duration?name=${input_term}&duration=${this.value}`;

      FetchApi(url);
    } else {
      //  document.querySelector(".main").innerHTML="";
      search_data(input_term);
    }
  });
}

async function FetchApi(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    pagination(data);
    append_data2(data);
  } catch (error) {
    console.log("error", error);
  }
}

const filter_my_data = (data) => {
  // counting = data.elements.length;
  // let i = 0;

  // document.getElementById("outersearchResult").innerText = "";

  data.courses.forEach((el) => {
    let {
      name,
      partners_name,
      photoUrl,
      certificates,
      description,
      partnerLogo,
    } = el;

    // let id = data.linked["partners.v1"].filter((ll) => {
    //   return ll.id == partnerIds[0];
    // });
    // let partners_name = id[0].name;

    append_data(
      photoUrl,
      name,
      partners_name,
      certificates,
      description,
      partnerLogo
    );
  });
};
// let i=0;
//     while(i<10){
//         let el = data.elements[i];
//     let {
//             name,
//             partnerIds,
//             photoUrl
//         } = el;
//         let id = data.linked["partners.v1"].filter((ll)=>{
//             return ll.id==partnerIds[0];
//         });
//         let partners_name = id[0].name;
//         append_data(photoUrl,name,partners_name);
//         i++;
//     }

// *********************************************************

let Button_Bottom1 = document.querySelector(".Button_Bottom1");
let Button_Bottom2 = document.querySelector(".Button_Bottom2");
let btn1 = document.querySelector(".btn1");

let previouspage, nextpage;

Button_Bottom1.addEventListener("click", () => {
  let url = `http://localhost:5000/courses?name=${input_term}&page=${previouspage}`;
  console.log("url:", url);

  search_data(url);
});

Button_Bottom2.addEventListener("click", () => {
  let url = `http://localhost:5000/courses?name=${input_term}&page=${nextpage}`;
  console.log("url:", url);
  search_data(url);
});

function pagination(data) {
  let { currentPage, previousPage, nextPage, totalPages } = data;
  previouspage = previousPage;
  nextpage = nextPage;

  if (previousPage == null) {
    Button_Bottom1.classList.add("disabled");
  } else {
    Button_Bottom1.classList.remove("disabled");
  }

  if (nextPage == null) {
    Button_Bottom2.classList.add("disabled");
  } else {
    Button_Bottom2.classList.remove("disabled");
  }

  btn1.innerHTML = currentPage;
}

function append_data2(data) {
  document.getElementById("searchResult").innerHTML = "";

  data.courses.forEach((el) => {
    let {
      name,
      partners_name,
      photoUrl,
      certificates,
      description,
      partnerLogo,
    } = el;

    // let heading = document.querySelector("#head_of_search");
    // heading.innerHTML = `${
    //   Math.round(Math.random() * 7) * 307
    // } total results for "${input_term}"`;
    let bigcontainer = document.createElement("div");
    bigcontainer.setAttribute("class", "just_for_border");

    bigcontainer.addEventListener("click", () => {
      let courseData = {
        name: name,
        description: description,
        partnerLogo: partnerLogo,
      };
      localStorage.setItem("courseData", JSON.stringify(courseData));
      window.location.href = "../coursePage.html";
    });

    let div1container = document.createElement("div");
    div1container.setAttribute("class", "boxSearch");

    let image = document.createElement("img");
    image.src = photoUrl;

    let div2container = document.createElement("div");
    div2container.setAttribute("class", "left_data");

    let coursename = document.createElement("h2");
    coursename.innerHTML = name;

    let partners = document.createElement("h3");
    partners.innerHTML = partners_name;

    let speciallisation = document.createElement("h4");
    speciallisation.innerHTML = "Specialization";

    let rating_div = document.createElement("div");
    rating_div.setAttribute("class", "rating");

    let star = document.createElement("img");
    star.src = "../components/icons/stars.jpg";

    let Rating = document.createElement("h5");
    let x = (Math.random() * 5).toFixed(1);
    if (x < 4) {
      x = 4 + +(Math.random() * 1).toFixed(1);
    }
    Rating.innerHTML = x;

    let Students = document.createElement("p");
    Students.innerHTML = Math.floor(Math.random() * 999) + "K" + " Students";
    rating_div.append(star, Rating, Students);
    div2container.append(coursename, partners, speciallisation, rating_div);
    div1container.append(image, div2container);
    bigcontainer.append(div1container);
    document.getElementById("searchResult").append(bigcontainer);
  });
}

// ********************************************************
// const append_data = (
//   photoUrl,
//   name,
//   partners_name,
//   certificates,
//   description,
//   partnerLogo
// ) => {
//   let heading = document.querySelector("#head_of_search");
//   heading.innerHTML = `${
//     Math.round(Math.random() * 7) * 307
//   } total results for "${input_term}"`;

//   let bigcontainer = document.createElement("div");
//   bigcontainer.setAttribute("class", "just_for_border");
//   bigcontainer.addEventListener("click", () => {
//     let courseData = {
//       name: name,
//       description: description,
//       partnerLogo: partnerLogo,
//     };
//     localStorage.setItem("courseData", JSON.stringify(courseData));
//     window.location.href = "../coursePage.html";
//   });

//   let div1container = document.createElement("div");
//   div1container.setAttribute("class", "boxSearch");

//   let image = document.createElement("img");
//   image.src = photoUrl;

//   let div2container = document.createElement("div");
//   div2container.setAttribute("class", "left_data");

//   let coursename = document.createElement("h2");
//   coursename.innerHTML = name;

//   let partners = document.createElement("h3");
//   partners.innerHTML = partners_name;

//   let speciallisation = document.createElement("h4");
//   speciallisation.innerHTML = "Specialization";

//   let rating_div = document.createElement("div");
//   rating_div.setAttribute("class", "rating");

//   let star = document.createElement("img");
//   star.src = "../components/icons/stars.jpg";

//   let Rating = document.createElement("h5");
//   let x = (Math.random() * 5).toFixed(1);
//   if (x < 4) {
//     x = 4 + +(Math.random() * 1).toFixed(1);
//   }
//   Rating.innerHTML = x;

//   let Students = document.createElement("p");
//   Students.innerHTML = Math.floor(Math.random() * 999) + "K" + " Students";
//   rating_div.append(star, Rating, Students);
//   div2container.append(coursename, partners, speciallisation, rating_div);
//   div1container.append(image, div2container);
//   bigcontainer.append(div1container);

//   document.getElementById("searchResult").append(bigcontainer);
// };

//-------------------------slideshow---------------->
const productContainers = [...document.querySelectorAll(".product-container")];
const nxtBtn = [...document.querySelectorAll(".nxt-btn")];
const preBtn = [...document.querySelectorAll(".pre-btn")];

productContainers.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nxtBtn[i].addEventListener("click", () => {
    item.scrollLeft += containerWidth;
  });

  preBtn[i].addEventListener("click", () => {
    item.scrollLeft -= containerWidth;
  });
});
