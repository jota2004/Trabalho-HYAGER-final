const changeThemeBtn = document.querySelector("#change-theme");

// Criando uma função altera todas as classes para o dark quando esta ativado
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Quando o site recarregar o site fica no modo que o usuario escolheu
function loadTheme() {
  const darkMode = localStorage.getItem("dark");

  if (darkMode) {
    toggleDarkMode();
  }
}

loadTheme();

changeThemeBtn.addEventListener("change", function () {
  toggleDarkMode();

  // Salvando o modo que o usuario escolheu
  localStorage.removeItem("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("dark", 1);
  }
});

function dados() {

  // Recebe a senha digitada pelo usuario no momento do cadastro
  let x = document.getElementById("senha").value;

  // Válidando a senha criada pelo usuario
  let text;
  if (isNaN(x) || x < 1000 || x > 1000000) {
    text = "Senha inválida";
  } 
  
  else {
    text = "Senha válida";
  }

  document.getElementById("resposta-senha").innerHTML = text;
}

//-------------------------------------------------------------------
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//-------------------------Enviando EMAIL---------------------------
class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute("action");
    }

    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    this.form.innerHTML = this.settings.success;
  }

  displayError() {
    this.form.innerHTML = this.settings.error;
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    } );
    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    event.target.disabled = true;
    event.target.innerText = "Enviando...";
  }

  async sendForm(event) {
    try {
      this.onSubmission(event);
      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        
        body: JSON.stringify(this.getFormObject()),
      });

      this.displaySuccess();
    } 
    
    catch (error) {
      this.displayError();
      throw new Error(error);
    }
  }

  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit( {
  form: "[data-form]",
  button: "[data-button]",
  success: "<h1 class='success'>Mensagem enviada!</h1>",
  error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
});

formSubmit.init();