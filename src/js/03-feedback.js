import throttle from "lodash.throttle";
import { saveToClientStorage, getFromClientStorage,removeFromClientStorage } from './client-storage';

const formRef = document.querySelector('.feedback-form');
const LOCAL_STORAGE_FORM_FIELD_KEY = 'feedback-form-state';
const formData = {
  email: "",
  message:"",
};


formRef.addEventListener('submit', formSubmit);
formRef.addEventListener('input', throttle(formInput, 500));

fillForm();


function formSubmit(event) {
  event.preventDefault();
  const userData = getFromClientStorage(LOCAL_STORAGE_FORM_FIELD_KEY);
  event.currentTarget.reset();
  removeFromClientStorage(LOCAL_STORAGE_FORM_FIELD_KEY);
  if (userData) {
    if (!(userData.email === "" || userData.message === "")) {
      console.log(userData);
    }
  }  
  formData.email = "";
  formData.message = "";
}
function formInput(event) {
  formData[event.target.name] = event.target.value;
  saveToClientStorage(LOCAL_STORAGE_FORM_FIELD_KEY, formData);
}

function fillForm() {
    const userData = getFromClientStorage(LOCAL_STORAGE_FORM_FIELD_KEY);
    const formElements = formRef.elements;

  if (userData) {
    formData.email = userData.email;
    formData.message = userData.message;
    formElements.email.value = userData.email;
    formElements.message.value = userData.message;
    }
}