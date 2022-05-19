document.getElementById('color1').addEventListener('change', colorBoxChanged);
document.getElementById('color1').addEventListener('input', colorBoxChanged);
document.getElementById('redSlyder').addEventListener('change', redSlyderChanged);
document.getElementById('greenSlyder').addEventListener('change', greenSlyderChanged);
document.getElementById('blueSlyder').addEventListener('change', blueSlyderChanged);

function redSlyderChanged() {
    const redSlyderValue = $('#redSlyder').val();
    const colorBox = $('#color1');
    const oldColor = colorBox.val();
    //console.log('вызов при изменеии Слайдера: ');
    //console.log(oldColor);
    let redHex =String(Number(redSlyderValue).toString(16));
    //console.log(redHex, redHex.length);
    if (redHex.length === 1) {
        redHex = '0' + redHex;
    } else if (redHex.length === 0) {
        redHex = '00';
    }
    let color='#'+ redHex + oldColor.substring(3);
    //console.log('новое значение цвета: #'+ redHex + oldColor.substring(3));
    colorBox.val(color);
    colorBox.css('background-color',color);
    //colorBox.trigger('change');
    //console.log( $.farbtastic('#colorpicker1'));
    $.farbtastic('#colorpicker1').setColor(color);
}
function greenSlyderChanged() {
    const greenSlyderValue = $('#greenSlyder').val();
    const colorBox = $('#color1');
    const oldColor = colorBox.val();
    //console.log('вызов при изменеии Слайдера GREEN: ');
    //console.log(oldColor);
    let greenHex =String(Number(greenSlyderValue).toString(16));
    //console.log(redHex, redHex.length);
    if (greenHex.length === 1) {
        greenHex = '0' + greenHex;
    } else if (greenHex.length === 0) {
        greenHex = '00';
    }
    let color = oldColor.substring(0,3) + greenHex + oldColor.substring(5);
    //console.log('новое значение цвета: '+ oldColor.substring(0,3) + greenHex + oldColor.substring(5));
    colorBox.val(color);
    colorBox.css('background-color',color);
    //colorBox.trigger('change');
    //console.log( $.farbtastic('#colorpicker1'));
    $.farbtastic('#colorpicker1').setColor(color);
}
function blueSlyderChanged() {
    const blueSlyderValue = $('#blueSlyder').val();
    const colorBox = $('#color1');
    const oldColor = colorBox.val();
    //console.log('вызов при изменеии Слайдера BLUE: ');
    //console.log(oldColor);
    let blurHex =String(Number(blueSlyderValue).toString(16));
    //console.log(redHex, redHex.length);
    if (blurHex.length === 1) {
        blurHex = '0' + blurHex;
    } else if (blurHex.length === 0) {
        blurHex = '00';
    }
    let color = oldColor.substring(0,5) + blurHex;
    //console.log('новое значение цвета: '+ oldColor.substring(0,5) + blurHex);
    colorBox.val(color);
    colorBox.css('background-color',color);
    //colorBox.trigger('change');
    //console.log( $.farbtastic('#colorpicker1'));
    $.farbtastic('#colorpicker1').setColor(color);
}
function colorBoxChanged() {
    //console.log("вызов при изменеии")
    let redSl = $('#redSlyder');
    let valueColorBox = redSl.val();
    //console.log(valueColorBox);
    //console.log(hex2rgb(valueColorBox).r);
    //console.log('значение слайдера '+ redSl.val());
    redSl.val(hex2rgb(valueColorBox).r);
    $('#greenSlyder').val(hex2rgb(valueColorBox).g);
    $('#blueSlyder').val(hex2rgb(valueColorBox).b);
    //console.log('новое значение слайдера RED '+ redSl.val());
}

function hex2rgb(c) {
    const bigint = parseInt(c.split('#')[1], 16);
    return hex2rgb ? {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    } : null;
}