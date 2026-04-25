function handleContactSubmit(e) {
    e.preventDefault(); 
    var submission = {
        name:      document.getElementById("name").value,
        email:     document.getElementById("email").value,
        subject:   document.getElementById("subject").value,
        message:   document.getElementById("message").value,
    };
    var allSubmissions = JSON.parse(localStorage.getItem("darsh_contact_data")) || [];
    allSubmissions.push(submission);
    localStorage.setItem("darsh_contact_data", JSON.stringify(allSubmissions));
    console.log("New submission saved:", submission);
    console.log("Total submissions so far:", allSubmissions.length);
    alert("Message sent! Thank you for reaching out, " + submission.name + " 🙌\nI'll get back to you soon.");
    e.target.reset();
    return false;
}
var contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit);
}
window.addEventListener("load", function () {
    var saved = JSON.parse(localStorage.getItem("darsh_contact_data")) || [];
    if (saved.length > 0) {
        console.log("Previously saved submissions:", saved.length);
    }
});
var cvBtn = document.getElementById("cv_download_btn");
if (cvBtn) {
    cvBtn.addEventListener("click", function () {
        var link = document.createElement("a");
        link.href = "./Darsh CV.pdf";         
        link.download = "Darsh_Chawra_CV.pdf";
        link.click();
    });
}