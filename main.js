(()=>{"use strict";var e=document.querySelector(".general"),t=document.querySelector(".popup-img"),n=document.querySelector(".popup__img-elem"),o=document.querySelector(".popup__img-caption");function r(t){e.style.overflowY="hidden",t.classList.add("popup_opened"),t.addEventListener("mousedown",i),document.addEventListener("keydown",u)}function c(){o.textContent=event.target.alt,n.setAttribute("src",event.target.src),n.setAttribute("alt",event.target.alt),r(t)}function a(t){e.style.overflow="",t.classList.remove("popup_opened"),t.removeEventListener("mousedown",i),document.removeEventListener("keydown",u)}function u(){"Escape"===event.key&&a(document.querySelector(".popup_opened"))}function i(){event.target.classList.contains("popup_opened")&&a(event.target),event.target.classList.contains("popup-delete-card")&&a(event.target)}var s={baseUrl:"https://nomoreparties.co/v1/plus-cohort-16",headers:{authorization:"d9e55aed-7d90-42ef-807f-b764eb7d2a2e","Content-Type":"application/json"}},l=function(){return fetch("".concat(s.baseUrl,"/users/me"),{method:"GET",headers:s.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))},d=document.querySelector(".cards"),f=document.querySelector("#element").content,p=document.querySelector(".popup-delete-card"),m=document.querySelector(".popup-delete-card__button");function v(e,t,n,o,u,i){var l=f.querySelector(".card").cloneNode(!0),d=l.querySelector(".card__photo"),v=l.querySelector(".card__delete-icon"),h=l.querySelector(".card__like-icon"),y=l.querySelector(".card__like-icon-counter");return y.textContent=u.length,d.src=t,d.alt=n,l.querySelector(".card__caption-text").textContent=n,h.addEventListener("click",(function(){return function(e,t,n){t.classList.contains("card_liked")?function(e){return fetch("".concat(s.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:s.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(e).then((function(e){n.textContent=e.likes.length})).catch((function(e){return console.log(e)})):function(e){return fetch("".concat(s.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:s.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(e).then((function(e){n.textContent=e.likes.length})).catch((function(e){return console.log(e)})),t.classList.toggle("card_liked")}(e,h,y)})),d.addEventListener("click",c),u.forEach((function(e){e._id===i&&h.classList.add("card_liked")})),o!=i&&v.remove(),v.addEventListener("click",(function(){r(p),m.onclick=function(){!function(e,t){(function(e){return fetch("".concat(s.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:s.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))})(e).then((function(e){console.log(e.message)})).catch((function(e){return console.log(e)})),t.remove()}(e,l),a(p)}})),l}function h(e,t){var n=Array.from(e.querySelectorAll(".".concat(t.inputSelector))),o=e.querySelector(".".concat(t.buttonSelector));e.closest(".popup").classList.contains("popup_opened")?y(n,o,t):n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var o=e.querySelector(".".concat(t.id,"-input-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.inputErrorActiveClass),o.textContent=" "}(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-input-error"));t.classList.add(n.inputErrorClass),r.classList.add(n.inputErrorActiveClass),r.textContent=o}(e,t,n,t.validationMessage)}(e,r,t),y(n,o,t)}))}))}function y(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.buttonInactiveClass),t.disabled=!1):(t.classList.add(n.buttonInactiveClass),t.disabled=!0)}function _(e){Array.from(document.querySelectorAll(".".concat(e.inputErrorActiveClass))).forEach((function(t){t.classList.remove(e.inputErrorActiveClass),t.textContent=""})),Array.from(document.querySelectorAll(".".concat(e.inputErrorClass))).forEach((function(t){t.classList.remove(e.inputErrorClass)}))}var S=document.querySelectorAll(".popup"),E=document.querySelector(".profile__info-edit"),b=document.querySelector(".profile__avatar"),k=document.querySelector(".popup-update-avatar"),C=document.forms.avatar,q=C.elements.link,L=document.querySelector(".profile__name"),g=document.querySelector(".profile__job-info"),j=document.forms.edit,x=document.querySelector(".popup-edit"),A=x.querySelector("#name"),P=x.querySelector("#job"),U=document.querySelector(".profile__add-button"),T=document.forms.add,w=T.elements.link,D=T.elements.name,N=document.querySelector(".popup-add-card"),O={formSelector:"form",inputSelector:"popup__container-item",inputErrorClass:"popup__container-item-error",inputErrorActiveClass:"popup__container-item-error_active",buttonSelector:"popup__container-button",buttonInactiveClass:"popup__container-button_inactive"};function I(e,t){e?t.textContent="Сохранение..":"create"===t.value?t.textContent="Создать":"save"===t.value&&(t.textContent="Сохранить")}l().then((function(e){var t;b.src=e.avatar,L.textContent=e.name,g.textContent=e.about,t=e._id,fetch("".concat(s.baseUrl,"/cards"),{method:"GET",headers:s.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){e.reverse().forEach((function(e){d.prepend(v(e._id,e.link,e.name,e.owner._id,e.likes,t))}))})).catch((function(e){return console.log(e)}))})).catch((function(e){return console.log(e)})),function(e){Array.from(document.querySelectorAll(".".concat(e.formSelector))).forEach((function(t){return h(t,e)}))}(O),b.addEventListener("click",(function(){_(O),C.reset(),r(k),h(j,O)})),E.addEventListener("click",(function(){_(O),A.value=L.textContent,P.value=g.textContent,r(x),h(j,O)})),U.addEventListener("click",(function(){_(O),T.reset(),r(N),h(T,O)})),S.forEach((function(e){return e.querySelector(".popup__close-button").addEventListener("click",(function(){return a(e)}))})),j.addEventListener("submit",(function(){event.preventDefault();var e,t,n=event.submitter;I(!0,n),(e=A.value,t=P.value,fetch("".concat(s.baseUrl,"/users/me"),{method:"PATCH",headers:s.headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){L.textContent=e.name,g.textContent=e.about})).catch((function(e){return console.log(e)})).finally((function(){return I(!1,n)})),a(x)})),T.addEventListener("submit",(function(){event.preventDefault();var e=event.submitter;I(!0,e),l().then((function(e){var t,n,o=e._id;(t=w.value,n=D.value,fetch("".concat(s.baseUrl,"/cards"),{method:"POST",headers:s.headers,body:JSON.stringify({link:t,name:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){d.prepend(v(e._id,e.link,e.name,e.owner._id,e.likes,o))})).catch((function(e){return console.log(e)}))})).catch((function(e){return console.log(e)})).finally((function(){return I(!1,e)})),a(N)})),C.addEventListener("submit",(function(){event.preventDefault();var e,t=event.submitter;I(!0,t),(e=q.value,fetch("".concat(s.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:s.headers,body:JSON.stringify({avatar:e})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){b.src=e.avatar,a(k)})).catch((function(e){return console.log(e)})).finally((function(){return I(!1,t)}))}))})();