$('.image').on('click', function () {
    var modal = document.getElementById('modal-' + this.id);
    var modalImg = document.getElementById('image-' + this.id);
    modal.style.display = "block";
    modalImg.src = this.getElementsByTagName('img')[0].src;
});

$('.close').on('click', function () {
    var id = this.id;
    var targetId = id.replace(/close-/g, '');
    document.getElementById(targetId).style.display = 'none';
});
