const form = document.getElementById('form');
let fileURL;
let file;
const imageZone = document.querySelector('.image_zone');
const spanClick = document.querySelector('.span-click');
const buttonReset = document.getElementById('reset');
const inputFile = document.getElementById('inputFile');

function validPrenom(){
    let prenom =form.elements.prenom.value
    if (prenom.length < 3) {
        if (prenom.length === 0) {
            document.getElementById("prenom").style.borderColor = "";
            document.getElementById("prenomErr").style.color=""
            document.getElementById("prenomErr").innerHTML = "";
          }else{
        document.getElementById("prenom").style.borderColor = "red";
        document.getElementById("prenomErr").style.color="red"
        document.getElementById("prenomErr").innerHTML = "renseigner un nom avec plus de 3 caractères";
    }
      }else if (nom.length > 50) {
        document.getElementById("prenom").style.borderColor = "red";
        document.getElementById("prenomErr").style.color="red"
        document.getElementById("prenomErr").innerHTML = "renseigner un nom avec moin de 50 caractères";
      }else{
        document.getElementById("prenom").style.borderColor = "";
            document.getElementById("prenomErr").style.color=""
            document.getElementById("prenomErr").innerHTML = "";
      }
}
function validNom(){
    let nom = form.elements.nom.value
    if (nom.length < 3) {
        if (nom.length === 0) {
            document.getElementById("nom").style.borderColor = "";
            document.getElementById("nomErr").style.color=""
            document.getElementById("nomErr").innerHTML = "";
          }else{
        document.getElementById("nom").style.borderColor = "red";
        document.getElementById("nomErr").style.color="red"
        document.getElementById("nomErr").innerHTML = "renseigner un nom avec plus de 3 caractères";
    }
      }else if (nom.length > 50) {
        document.getElementById("nom").style.borderColor = "red";
        document.getElementById("nomErr").style.color="red"
        document.getElementById("nomErr").innerHTML = "renseigner un nom avec moin de 50 caractères";
      }else{
        document.getElementById("nom").style.borderColor = "";
            document.getElementById("nomErr").style.color=""
            document.getElementById("nomErr").innerHTML = "";
      }
}

function validPhone(){
    let telephone = form.elements.telephone.value
    let phoneReg = /^\d+$/;
    let validPrefixes = ["084", "085", "080", "089", "081", "082", "083", "099", "097", "090"];
if(!phoneReg.test(telephone)) {
    document.getElementById("telephone").style.borderColor = "red";
    document.getElementById("phoneErr").style.color="red"
    document.getElementById("phoneErr").innerHTML = "renseigner un numéro de téléphone valide";
}else if (telephone.length !== 10) {
    document.getElementById("telephone").style.borderColor = "red";
    document.getElementById("phoneErr").style.color="red"
    document.getElementById("phoneErr").innerHTML = "renseigner un numéro de téléphone avec 10 chiffres";
  }else if (!validPrefixes.includes(telephone.substring(0, 3))) {
    document.getElementById("telephone").style.borderColor = "red";
    document.getElementById("phoneErr").style.color="red"
    document.getElementById("phoneErr").innerHTML = "renseigner un numéro de téléphone au format valide";
  }else{
    document.getElementById("telephone").style.borderColor = "";
    document.getElementById("phoneErr").style.color=""
    document.getElementById("phoneErr").innerHTML = "";
  }
}
function validEmail(){
    let email = form.elements.email.value
    const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email)) {
        document.getElementById("email").style.borderColor = "red";
        document.getElementById("emailErr").style.color="red"
        document.getElementById("emailErr").innerHTML = "Veuillez saisir une adresse email valide";
        return false;
      } else {
        document.getElementById("email").style.borderColor = "";
        document.getElementById("emailErr").style.color=""
        document.getElementById("emailErr").innerHTML = "";
        return true;
      }
}
imageZone.addEventListener('dragover', (event) => {      
    event.preventDefault();
    imageZone.textContent = 'Relacher image';
    imageZone.classList.add('active');
});

imageZone.addEventListener('dragleave', () => {
    imageZone.innerHTML = `<p class="text-image">Déposez la photo ici ou <span class="span-click">Cliquer ici</span></p>`;
    imageZone.classList.remove('active');
});

imageZone.addEventListener('drop', (event) => {
    event.preventDefault();
    file = event.dataTransfer.files[0];
    let fileType = file.type
    let validExt = ['image/jpeg','image/jpg','image/png']
    if(file.size >5000000){
        imageZone.style.borderColor = "red"
        imageZone.innerHTML = `<p class="text-image">Déposez la photo ici ou <span class="span-click">Cliquer ici</span></p>`
        document.getElementById("imgErr").style.color="red"
        document.getElementById("imgErr").innerHTML = "le poids de l’image doit être inférieur à 5 Mo";
        
    }else if(!validExt.includes(fileType)){
        imageZone.style.borderColor = "red"
        imageZone.innerHTML = `<p class="text-image">Déposez la photo ici ou <span class="span-click">Cliquer ici</span></p>`
        document.getElementById("imgErr").style.color="red"
        document.getElementById("imgErr").innerHTML = "renseigner une image valide";
    }
    else{
        imageZone.style.borderColor = ""
        document.getElementById("imgErr").style.color=""
        document.getElementById("imgErr").innerHTML = "";
        displayImg();
}
});
// Afficher image sur zone image
function displayImg(){
    let fileReader = new FileReader()
    fileReader.onload = () => {
    fileURL = fileReader.result;
    let imgTag = `<img src = "${fileURL}" alt = "" >`
    imageZone.innerHTML = imgTag
    }
    fileReader.readAsDataURL(file)
}
spanClick.onclick = () => {
    inputFile.click();
}
inputFile.addEventListener('change', () => {
    file = inputFile.files[0];
    displayImg();
});
// Ajouter contact
form.addEventListener('submit', function(){
    if(localStorage.hasOwnProperty('formData')){
        const dataObject = JSON.parse(localStorage.getItem('formData'));

        Object.defineProperty(dataObject, `${form.elements.prenom.value}`,{
            value:{
                prenom : form.elements.prenom.value,
                nom: form.elements.nom.value,
                telephone : form.elements.telephone.value,
                groupe: form.elements.groupe.value,
                email: form.elements.email.value,
                bio: form.elements.bio.value,
                image : fileURL
            },
            writable : true,
            enumerable : true,
            configurable : true
        });
        localStorage.setItem('formData', JSON.stringify(dataObject));

    }else{
            const formData = {};
            Object.defineProperty(formData,`${form.elements.prenom.value}`,{
                value:{
                    prenom : form.elements.prenom.value,
                    nom: form.elements.nom.value,
                    telephone : form.elements.telephone.value,
                    groupe: form.elements.groupe.value,
                    email: form.elements.email.value,
                    bio: form.elements.bio.value,
                    image: fileURL
                },
                writable : true,
                enumerable : true,
                configurable : true
            });
        localStorage.setItem('formData', JSON.stringify(formData));
    }

});
if(localStorage.hasOwnProperty('formData')){
    const contacts = JSON.parse(localStorage.getItem('formData'));
    const conteneurContact = document.querySelector('.block_liste_contacts')

    for(let index in contacts){
        const divContact = document.createElement('div');
        divContact.innerHTML = `
        <div class="contacts">
            <div class="image_contact">
                <img src="${contacts[index].image}" alt="" >
            </div>
            
            <div class="info_contact">
            <div class="align">
                <h3>
                    ${contacts[index].prenom} ${contacts[index].nom} - ${contacts[index].groupe}
                </h3>
                <div class="icon">
                    <span><a href="#" class="icon1" data-key="${index}"><i class="fa-solid fa-user-pen"></i></a></span>
                    <span> <a href="#" class="icon2" data-key="${index}"><i class="fa-solid fa-trash"></i></a></span>
                </div>
            </div>

            <h4>${contacts[index].telephone}</h4>
            <p>
                ${contacts[index].bio}
            </p>
            </div>
        </div>`

        conteneurContact.appendChild(divContact);

        const iconsEdite = document.querySelectorAll('.icon1');
        const iconsDelete = document.getElementsByClassName('icon2');

        for(let i = 0 ; i < iconsEdite.length ; i++){
               
                iconsEdite[i].addEventListener('click', function(){
            

                    let key = this.getAttribute('data-key');
                    let item = contacts[key];
                    let button = form.elements.create;
                    button.innerHTML = "Modifier";
                    const objectFormData = JSON.parse(localStorage.formData); 
                    
                    form.elements.prenom.value = item.prenom;
                    form.elements.nom.value = item.nom;
                    form.elements.telephone.value = item.telephone;
                    form.elements.groupe.value = item.groupe;
                    form.elements.email.value = item.email;
                    form.elements.bio.value = item.bio;
                });

        }

        for(let i = 0 ; i < iconsDelete.length ; i++){
            iconsDelete[i].addEventListener('click', function(){
                let key = this.getAttribute('data-key');
                let objetContacts = JSON.parse(localStorage.formData);
                delete objetContacts[key];

                objetContacts = JSON.stringify(objetContacts);
                localStorage.removeItem('formData');
                localStorage.setItem('formData', objetContacts);
                location.reload();
            });

        }
    }
}
