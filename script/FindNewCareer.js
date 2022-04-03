import navbar from "../components/navbar.js";
import { Minifooter } from "../components/footer.js";
let navBar = document.getElementById("navbar");
navBar.innerHTML = navbar();
let footerDiv = document.getElementById("footer_div");
footerDiv.innerHTML = Minifooter();


const faqs = document.querySelectorAll(".faq");
faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("active");
  });
});


let hide_me = document.querySelector("#user_div_data");
hide_me.style.display = "none";

let hide_me_also = document.querySelector("#bell_icon");
hide_me_also.style.display = "none";

let show_me_also = document.querySelector("#log_in_text");
show_me_also.style.display = "block";

let show_me = document.querySelector("#join_for_free");
show_me.style.display = "block";
show_me.addEventListener("click", () => {
  window.location.href = "./signup.html";
  window.location.reload();
});

let token = JSON.parse(localStorage.getItem("Course-eraToken"));
if (token) {
  let user = JSON.parse(localStorage.getItem("CurrentUser"));
  let name_of_user = user.username;
  let user_Name = document.querySelector("#user_name");
  user_Name.innerText = name_of_user;
  user_Name.style.width = "100px";
  console.log(token, user);
}
if (token) {
  let hide_me = document.querySelector("#user_div_data");
  hide_me.style.display = "flex";

  let hide_me_also = document.querySelector("#bell_icon");
  hide_me_also.style.display = "flex";

  let show_me = document.querySelector("#join_for_free");
  show_me.style.display = "none";

  let show_me_also = document.querySelector("#log_in_text");
  show_me_also.style.display = "none";
} else {
  let hide_me = document.querySelector("#user_div_data");
  hide_me.style.display = "none";

  let hide_me_also = document.querySelector("#bell_icon");
  hide_me_also.style.display = "none";

  let show_me = document.querySelector("#join_for_free");
  show_me.style.display = "block";

  let show_me_also = document.querySelector("#log_in_text");
  show_me_also.style.display = "block";
}