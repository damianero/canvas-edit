        (function($, window, undefined) {

            var app = function() {

                var dropZone = document.getElementById('drop_zone');
                var gridCounter = $('input[name="grid"]');
                var canvas = document.getElementById('tutorial');
                var ctx = canvas.getContext('2d');


                var gridGenerate = $('[data-type="generate-canvas"]');
                var gridGenerateTriple = $('[data-type="generate-canvas-triple"]');
                var lineWidthGet = $('input[name="lineSize"]');
                var lineWidthGetTC = $('input[name="lineSizeTriple"]');
                var lineColorEdit = $('#line-value');
                var textColorEdit = $('#text-value');
                var btnSave = $('[data-type="download"]');
                var modes = $('input[name="mode"]');
                var centerShift_x;
                var ratio;
                var fileHeight;
                var fileWidth;
                var mode = 'single-image';
                var imageData = {};
                var handleDragOver = function(evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
                };

                var renderGrid = function() {

                    var counter = $('input[name="grid"]').val();


                    if ($(canvas).attr('data-file') !== 'true') {
                        alert('You must upload Image First');
                    }

                    var cHeight = $(canvas).attr('height');
                    var cWidth = $(canvas).attr('width');
                    var gridSpace = cWidth / counter;
                    var texts = document.querySelectorAll('[data-column]');
                    var fontStyle = $('#fs option:selected').val();
                    var canvasColor = $('#canvas-value').parent().text();
                    var lineWidth = lineWidthGet.val();
                    var lineColor = lineColorEdit.parent().text();
                    var fontColor = textColorEdit.parent().text();

                    ctx.fillStyle = canvasColor;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.putImageData(imageData, 0, 0);

                    function setX(textWidth, startPos, EndPos) {

                        var xPos = 0;
                        var length = (EndPos - startPos - textWidth) / 2;
                        xPos = startPos + length;
                        return xPos;
                    }

                    function setY(textHeight, startPos1, EndPos1) {
                        console.log(startPos1);
                        console.log(EndPos1);
                        console.log(textHeight);

                        var yPos = 0;
                        var length = (EndPos1 - startPos1 - textHeight) / 2;
                        yPos = startPos1 + length;

                        console.log(yPos);
                        return yPos;
                    }

                    var vCenter = 0;
                    for (var i = 0; i <= counter; i++) {

                        ctx.beginPath();
                        if (i >= 0 && i <= counter) {
                            ctx.moveTo(0 + i * gridSpace, 0);
                            ctx.lineTo(0 + i * gridSpace, cHeight);
                        }
                        ctx.textBaseline = "top";
                        ctx.lineWidth = lineWidth;
                        ctx.font = fontStyle + 'px Calibri';
                        ctx.fillStyle = fontColor;
                        var cont = $('[data-column="' + (i + 1) + '"]').val();
                        var l = ctx.measureText(cont);
                        var center = setX(l.width, 0 + (i) * gridSpace, 0 + (i + 1) * gridSpace);


                        vCenter = setY(fontStyle * 1.42857143, fileHeight, cHeight);


                        ctx.fillText(cont, center, vCenter);
                        ctx.strokeStyle = lineColor;
                        ctx.stroke();


                    }



                };

                var renderSingle = function() {


                    if ($(canvas).attr('data-file') !== 'true') {
                        alert('You must upload Image First');
                    }


                    var lineWidth = $('input[name="lineSizeSingle"]').val();
                    var color = $('#text-value-single').parent().text();
                    var fontStyle = $('#fsS option:selected').val();
                    var canvasSingleColor = $('#canvas-valueS').parent().text();

                    ctx.fillStyle = canvasSingleColor;

                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.putImageData(imageData, centerShift_x, centerShift_x);

                    var textMain = $('[data-single="text"]').val();

                    ctx.textBaseline = "top";
                    ctx.fillStyle = color;
                    ctx.font = fontStyle + 'px Calibri';

                    function setX(textWidth, startPos, EndPos) {

                        var xPos = 0;
                        var length = (EndPos - startPos - textWidth) / 2;
                        xPos = startPos + length;
                        return xPos;
                    }

                    function setY(textHeight, startPos1, EndPos1) {
                        var yPos = 0;
                        var length = (EndPos1 - startPos1 - textHeight) / 2;
                        yPos = startPos1 + length;
                        return yPos;
                    }

                    ctx.beginPath();
                    ctx.rect(centerShift_x, canvas.height - centerShift_x - 400, fileWidth * ratio, 400);
                    ctx.strokeStyle = color;


                    var l = ctx.measureText(textMain);
                    console.log(l);
                    console.log(centerShift_x);
                    console.log(canvas.width);
                    var center = setX(l.width, centerShift_x, canvas.width - centerShift_x);
                    
                    var vCenter = setY(fontStyle * 1.42857143, canvas.height - centerShift_x - 400 , canvas.height - centerShift_x);
                    console.log(center);
                    console.log(vCenter);
                    ctx.fillText(textMain, center, vCenter);
                    ctx.lineWidth = lineWidth;
                    ctx.stroke();
                    ctx.closePath();

                };

                var renderTriangle = function() {


                    if ($(canvas).attr('data-file') !== 'true') {
                        alert('You must upload Image First');
                    }
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    var x, y;

                    var cHeight = $(canvas).attr('height');
                    var cWidth = $(canvas).attr('width');
                    var lineWidth = $('input[name="lineSizeTran"]').val();
                    var colorLine = $('#line-trang-value').parent().text();

                    ctx.putImageData(imageData, 0, 0);

                    function drawLine(width, color, point1, point2) {
                        ctx.lineWidth = width;
                        ctx.strokeStyle = color;
                        ctx.beginPath();
                        ctx.moveTo(point1[0], point1[1]);
                        ctx.lineTo(point2[0], point2[1]);
                        ctx.stroke();
                        ctx.closePath();
                    }

                    function drawLine2(width, color, point1, point2, point3) {
                        ctx.lineWidth = width;
                        ctx.strokeStyle = color;
                        ctx.beginPath();
                        ctx.moveTo(point1[0], point1[1]);
                        ctx.lineTo(point2[0], point2[1]);
                        ctx.lineTo(point3[0], point3[1]);
                        ctx.stroke();
                        ctx.closePath();
                    }

                    function drawLine3(width, color, p1, p2, p3, p4) {
                        ctx.lineWidth = width;
                        ctx.strokeStyle = color;
                        ctx.beginPath();
                        ctx.moveTo(p1[0], p1[1]);
                        ctx.lineTo(p2[0], p2[1]);
                        ctx.moveTo(p3[0], p3[1]);
                        ctx.lineTo(p4[0], p4[1]);
                        ctx.stroke();
                        ctx.closePath();
                    }

                    function drawLine4(width, color, p1, p2, p3, p4) {
                        ctx.lineWidth = width;
                        ctx.strokeStyle = color;
                        ctx.beginPath();
                        ctx.moveTo(p1[0], p1[1]);
                        ctx.lineTo(p2[0], p2[1]);
                        ctx.lineTo(p3[0], p3[1]);
                        ctx.lineTo(p4[0], p4[1]);
                        ctx.stroke();
                        ctx.closePath();
                    }

                    var jsonDim = {
                        2: {
                            1: {
                                "start": [0, 0],
                                "end": [cWidth, cHeight]
                            },
                            2: { "start": [cWidth, 0], "end": [0, cHeight] }
                        },
                        3: {
                            1: {
                                "f": [0, 0],
                                "s": [cWidth, cHeight / 2],
                                "t": [0, cHeight]
                            },
                            2: {
                                "f": [cWidth, 0],
                                "s": [0, cHeight / 2],
                                "t": [cWidth, cHeight]
                            },
                            3: {
                                "f": [0, cHeight],
                                "s": [cWidth / 2, 0],
                                "t": [cWidth, cHeight]
                            },
                            4: {
                                "f": [0, 0],
                                "s": [cWidth / 2, cHeight],
                                "t": [cWidth, 0]
                            },
                            5: {
                                "f": [0, cHeight],
                                "s": [cWidth, 0],
                                "t": [cWidth, cHeight],
                                "l": [cWidth / 2, cHeight / 2]
                            },
                            6: {
                                "f": [cWidth, 0],
                                "s": [0, cHeight],
                                "t": [0, 0],
                                "l": [cWidth / 2, cHeight / 2]
                            },
                            7: {
                                "f": [0, 0],
                                "s": [cWidth, cHeight],
                                "t": [0, cHeight],
                                "l": [cWidth / 2, cHeight / 2]
                            },

                            8: {
                                "f": [0, 0],
                                "s": [cWidth, cHeight],
                                "t": [cWidth, 0],
                                "l": [cWidth / 2, cHeight / 2]
                            }

                        },
                        4: {
                            1: {
                                "start": [0, 0],
                                "mid": [cWidth, cHeight * 1 / 3],
                                "smid": [0, cHeight * 2 / 3],
                                "end": [cWidth, cHeight]
                            },
                            2: {
                                "start": [cWidth, 0],
                                "mid": [0, cHeight * 1 / 3],
                                "smid": [cWidth, cHeight * 2 / 3],
                                "end": [0, cHeight]
                            },
                            3: {
                                "start": [0, 0],
                                "mid": [cWidth * 1 / 3, cHeight],
                                "smid": [cWidth * 2 / 3, 0],
                                "end": [cWidth, cHeight]
                            },
                            4: {
                                "start": [0, cHeight],
                                "mid": [cWidth * 1 / 3, 0],
                                "smid": [cWidth * 2 / 3, cHeight],
                                "end": [cWidth, 0]
                            },
                            5: {
                                "start": [0, 0],
                                "mid": [cWidth, 0],
                                "smid": [0, cHeight],
                                "end": [cWidth, cHeight]
                            },
                        },
                        5: {
                            1: {
                                "s": [cWidth, 0],
                                "m": [0, cHeight / 2],
                                "e": [cWidth, cHeight / 2],

                                "st": [0, cHeight],
                                "sr": [cWidth / 2, cHeight / 2],
                                "k": [cWidth, cHeight]
                            },

                            2: {
                                "s": [0, 0],
                                "m": [cWidth, cHeight / 2],
                                "e": [0, cHeight / 2],

                                "st": [0, cHeight],
                                "sr": [cWidth / 2, cHeight / 2],
                                "k": [cWidth, cHeight]
                            },

                            3: {
                                "s": [0, cHeight],
                                "m": [cWidth / 2, 0],
                                "e": [cWidth / 2, cHeight],

                                "st": [cWidth, 0],
                                "sr": [cWidth / 2, cHeight / 2],
                                "k": [cWidth, cHeight]
                            },

                            4: {
                                "s": [0, 0],
                                "m": [cWidth / 2, cHeight],
                                "e": [cWidth / 2, 0],

                                "st": [cWidth, 0],
                                "sr": [cWidth / 2, cHeight / 2],
                                "k": [cWidth, cHeight]
                            },

                            5: {
                                "s": [0, 0],
                                "m": [cWidth / 2, cHeight / 2],
                                "e": [0, cHeight],

                                "st": [cWidth / 2, 0],
                                "sr": [cWidth / 2, cHeight],
                                "k": [cWidth, 0]
                            },
                            6: {
                                "s": [0, 0],
                                "m": [cWidth / 2, cHeight / 2],
                                "e": [0, cHeight],

                                "st": [cWidth / 2, cHeight],
                                "sr": [cWidth / 2, 0],
                                "k": [cWidth, cHeight]
                            }
                        }
                    };


                    var amount = $('input[name="triangle-amount"]').val();
                    var option;
                    switch (amount) {
                        case '2':
                        option = Math.floor(Math.random() * 2) + 1;
                        drawLine(lineWidth, colorLine, jsonDim[2][option].start, jsonDim[2][option].end);
                        break;
                        case '3':
                        option = Math.floor(Math.random() * 8) + 1;
                        if (option <= 4) {
                            drawLine2(lineWidth, colorLine, jsonDim[3][option].f, jsonDim[3][option].s, jsonDim[3][option].t);
                        } else {
                            drawLine3(lineWidth, colorLine, jsonDim[3][option].f, jsonDim[3][option].s, jsonDim[3][option].t, jsonDim[3][option].l);
                        }

                        break;

                        case '4':
                        option = Math.floor(Math.random() * 5) + 1;
                        if (option < 5) {
                            drawLine4(lineWidth, colorLine, jsonDim[4][option].start, jsonDim[4][option].mid, jsonDim[4][option].smid, jsonDim[4][option].end);
                        } else {
                            drawLine(lineWidth, colorLine, jsonDim[4][option].start, jsonDim[4][option].end);
                            drawLine(lineWidth, colorLine, jsonDim[4][option].mid, jsonDim[4][option].smid);
                        }

                        break;

                        case '5':
                            // 6 opcj
                            option = Math.floor(Math.random() * 5) + 1;
                            drawLine2(lineWidth, colorLine, jsonDim[5][option].s, jsonDim[5][option].m, jsonDim[5][option].e);
                            drawLine2(lineWidth, colorLine, jsonDim[5][option].st, jsonDim[5][option].sr, jsonDim[5][option].k);

                            break;
                            default:
                            // statements_def
                            break;
                        }
                    };

                    var renderTriple = function() {

                        if ($(canvas).attr('data-file') !== 'true') {
                            alert('You must upload Image First');

                        }

                        var lineWidth = lineWidthGetTC.val();
                        var cHeight = $(canvas).attr('height');
                        var cWidth = $(canvas).attr('width');
                        var canvasTripleColor = $('#canvas-value2').parent().text();
                        var textTripleColor = $('#triple-text').parent().text();
                        var lineTripleColor = $('#triple-line').parent().text();

                        ctx.fillStyle = canvasTripleColor;

                        ctx.fillRect(0, 0, canvas.width, canvas.height);


                        ctx.putImageData(imageData, 0, 0);

                        var fontStyle = $('#fs-tc option:selected').val();
                        var textsColumn = document.querySelectorAll('[data-column-triple]');
                        var notImagePart = (cHeight - fileHeight) / 2 + fileHeight;
                        var boxheight = 0.2 * cWidth;
                        var arrDim = [
                        { x: 0, y: fileHeight + 0.125 * 0.2 * fileHeight, width: 33.33 / 100 * cWidth, height: 0.80 * 0.2 * fileHeight },
                        { x: 0.3333333333 * cWidth, y: fileHeight + 0.125 * 0.2 * fileHeight, width: 33.33 / 100 * cWidth, height: 0.80 * 0.2 * fileHeight },
                        { x: 0.6666666667 * cWidth, y: fileHeight + 0.125 * 0.2 * fileHeight, width: 33.33 / 100 * cWidth, height: 0.80 * 0.2 * fileHeight }
                        ];



                        function setX(textWidth, startPos, EndPos) {

                            var xPos = 0;
                            var length = (EndPos - startPos - textWidth) / 2;
                            xPos = startPos + length;
                            return xPos;
                        }

                        function setY(textHeight, startPos1, EndPos1) {
                            var yPos = 0;
                            var length = (EndPos1 - startPos1 - textHeight) / 2;
                            yPos = startPos1 + length;
                            return yPos;
                        }

                        ctx.textBaseline = "top";
                        ctx.fillStyle = textTripleColor;
                        ctx.font = fontStyle + 'px Calibri';
                        var center = 0;
                        var vCenter = 0;
                        for (var i = 0; i < textsColumn.length; i++) {
                            ctx.beginPath();
                            ctx.rect(arrDim[i].x, arrDim[i].y, arrDim[i].width, arrDim[i].height);
                            ctx.strokeStyle = lineTripleColor;

                            var cont = $('[data-column-triple="' + (i + 1) + '"]').val();
                            var l = ctx.measureText(cont);

                            if (i === 2) {
                                center = setX(l.width, arrDim[i].x, arrDim[i].x + arrDim[i].width);
                            } else {
                                center = setX(l.width, arrDim[i].x, arrDim[i + 1].x);
                            }

                            vCenter = setY(fontStyle * 1.42857143, arrDim[i].y, arrDim[i].y + arrDim[i].height);
                            ctx.fillText(cont, center, vCenter);
                            ctx.lineWidth = lineWidth;
                            ctx.stroke();
                            ctx.closePath();

                        }

                    };

                    var renderImage = function(file) {
                        var canvas = document.getElementById('tutorial');
                        $(canvas).attr('data-file', 'true');
                        var ctx = canvas.getContext('2d');
                        var hRatio,
                        vRatio;

                        if (mode == 'triangle') {
                            $('canvas').attr('height', file.height).attr('width', file.width);
                            ctx.drawImage(file, 0, 0, file.width, file.height);
                            imageData = ctx.getImageData(0, 0, file.width, file.height);
                        } else if (mode == 'single-image') {

                            hRatio = 1654 / file.width;
                            vRatio = 2339 / file.height;
                            ratio = Math.min(hRatio, vRatio) * 0.98;
                            $('canvas').attr('height', 2339).attr('width', 1654);

                            centerShift_x = (canvas.width - file.width * ratio) / 2;
                            var centerShift_y = (canvas.height - file.height * ratio) / 2;


                            ctx.drawImage(file, centerShift_x, centerShift_x, file.width * ratio, file.height * ratio);
                            imageData = ctx.getImageData(0 + centerShift_x, 0 + centerShift_x, file.width * ratio, file.height * ratio);
                        } else {
                            $('canvas').attr('height', file.height + 0.2 * file.height).attr('width', file.width);
                            ctx.drawImage(file, 0, 0, file.width, file.height);
                            imageData = ctx.getImageData(0, 0, file.width, file.height);
                        }





                    };
                    var handleFileSelect = function(evt) {
                        evt.stopPropagation();
                        evt.preventDefault();

                    var files = evt.dataTransfer.files; // FileList object.

                    // files is a FileList of File objects. List some properties.
                    var output = [];
                    for (var i = 0, f; f = files[i]; i++) {



                        output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                            f.size, ' bytes, last modified: ',
                            f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                            '</li>');

                        document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';


                        var reader = new FileReader();
                        // Closure to capture the file information.
                        reader.onload = (function(theFile) {
                            return function(e) {
                                // Render thumbnail.
                                var span = document.createElement('span');
                                var img = new Image();
                                img.src = e.target.result;
                                img.onload = function() {
                                    fileHeight = this.height;
                                    fileWidth = this.width;
                                    renderImage(this);
                                    $('#drop_zone').fadeOut();
                                    $('#tutorial').addClass('loaded');
                                    btnSave.show();
                                };





                                // span.innerHTML = ['<img class="thumb" src="', e.target.result,
                                // '" title="', escape(theFile.name), '"/>'
                                // ].join('');
                                // document.getElementById('list').insertBefore(span, null);
                            };
                        })(f);

                        // Read in the image file as a data URL.
                        reader.readAsDataURL(f);
                    }
                };

                var checkSupport = function() {
                    if (window.File && window.FileReader && window.FileList && window.Blob) {
                        return true;
                    } else {
                        return false;
                    }
                };

                var download = function(link, canvasId, filename) {

                    link.href = document.getElementById(canvasId).toDataURL();
                    link.download = filename;

                };

                var guid = function() {
                    function s4() {
                        return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                    }
                    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
                };

                var init = function() {
                    if (checkSupport) {
                        dropZone.addEventListener('dragover', handleDragOver, false);
                        dropZone.addEventListener('drop', handleFileSelect, false);




                        modes.on('change', function() {
                            if ($(this).is(':checked')) {
                                mode = $(this).val();
                                console.log(mode);
                                if ($(canvas).attr('data-file') == 'true') {
                                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                                    ctx.putImageData(imageData, 0, 0);
                                }
                                $('[data-mode="' + mode + '"]').addClass('active');
                                $('[data-mode="' + mode + '"]').siblings().removeClass('active');

                                if (mode == 'triangle') {
                                    $('canvas').attr('height', fileHeight).attr('width', fileWidth);
                                } else if (mode == 'single-image') {
                                    $('canvas').attr('height', 2339).attr('width', 1654);
                                } else {
                                    $('canvas').attr('height', fileHeight + 0.2 * fileHeight).attr('width', fileWidth);
                                }
                            }
                            




                        });


                        $('[data-column]').fadeOut();
                        $('[data-column="1"]').fadeIn();
                        gridCounter.on('change', function() {
                            var counter = $(this).val();
                            $('[data-column]').hide();
                            for (var i = 1; i <= counter; i++) {
                                $('[data-column="' + i + '"]').fadeIn();
                            }
                        });

                        // gridGenerateTriple.on('click tap', renderTriple);
                        gridGenerate.on('click', function() {
                            console.log(mode);

                            switch (mode) {
                                case 'grid':
                                renderGrid();
                                break;
                                case 'triple-c':
                                renderTriple();
                                break;
                                case 'triangle':
                                renderTriangle();
                                break;
                                case 'single-image':
                                renderSingle();
                                break;
                                default:
                                alert('You have to choose mode');
                                break;
                            }
                        });
                        btnSave.on('click', function() {
                            download(this, 'tutorial', guid());
                        });


                    }

                };

                return init();
            };


            var EI = new app();



            //      var FB = window.FB;

            //      window.fbAsyncInit = function() {
            //          FB.init({
            //              appId: '207975206314646',
            //              xfbml: true,
            //              cookie: true,
            //              version: 'v2.8'
            //          });
            //          FB.AppEvents.logPageView();
            //      };


            //      function checkLoginState() {
            //          FB.getLoginStatus(function(response) {
            //              statusChangeCallback(response);
            //          });
            //      }

            //      FB.getLoginStatus(function(response) {
            //          statusChangeCallback(response);
            //      });

            //      function statusChangeCallback(response) {
            //          console.log('statusChangeCallback');
            //          console.log(response);
            //     // The response object is returned with a status field that lets the
            //     // app know the current login status of the person.
            //     // Full docs on the response object can be found in the documentation
            //     // for FB.getLoginStatus().
            //     if (response.status === 'connected') {
            //         // Logged into your app and Facebook.
            //         testAPI();
            //     } else if (response.status === 'not_authorized') {
            //         // The person is logged into Facebook, but not your app.
            //         document.getElementById('status').innerHTML = 'Please log ' +
            //         'into this app.';
            //     } else {
            //         // The person is not logged into Facebook, so we're not sure if
            //         // they are logged into this app or not.
            //         document.getElementById('status').innerHTML = 'Please log ' +
            //         'into Facebook.';
            //     }
            // }




            // function testAPI() {
            //  console.log('Welcome!  Fetching your information.... ');
            //  FB.api('/me', function(response) {
            //      console.log('Successful login for: ' + response.name);
            //      document.getElementById('status').innerHTML =
            //      'Thanks for logging in, ' + response.name + '!';
            //  });
            // }


        })($, window);
