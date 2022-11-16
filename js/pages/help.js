document.getElementById('help-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    this.contact_number.value = Math.random() * 100000 | 0;
    
    emailjs.sendForm('gmailserviceclimapp', 'contact_climapp', this)
        .then(function() {
            const success_message = document.getElementById('success_message');
            success_message.style.display = "block";
            setTimeout(() => {
                success_message.style.display = "none";
            }, 3000);
        }, function(error) {
            const error_message = document.getElementById('error_message');
            error_message.style.display = "block";
            setTimeout(() => {
                error_message.style.display = "none";
            }, 3000);
        });
});