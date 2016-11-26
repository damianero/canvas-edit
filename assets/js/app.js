        (function($, window, undefined) {

            var app = function() {

                var dropZone = document.getElementById('drop_zone');
                var gridCounter = $('input[name="grid"]');
                
                var gridGenerate = $('[data-type="generate-canvas"]');
                var lineWidthGet = $('input[name="lineSize"]');
                var lineColorEdit = $('#line-value');
                var textColorEdit = $('#text-value');
                var btnSave = $('[data-type="download"]');

                var imageData = {};
                var handleDragOver = function(evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
                };

                var renderGrid = function() {

                    var counter = $('input[name="grid"]').val();
                    var canvas = document.getElementById('tutorial');
                    var ctx = canvas.getContext('2d');


                    if ($(canvas).attr('data-file') !== 'true') {
                        alert('You must upload Image First');
                    }
                    ctx.putImageData(imageData, 0, 0);
                    var cHeight = $(canvas).attr('height');
                    var cWidth = $(canvas).attr('width');
                    var gridSpace = cWidth / counter;
                    var texts = document.querySelectorAll('[data-column]');
                    var fontStyle = $('#fs option:selected').val();
                    var lineWidth = lineWidthGet.val();
                    var lineColor = lineColorEdit.parent().text();
                    var fontColor = textColorEdit.parent().text();
                    console.log(texts);

                    function setX(textWidth, startPos, EndPos) {

                        var xPos = 0;
                        var length = (EndPos - startPos - textWidth) / 2;
                        xPos = startPos + length;
                        return xPos;
                    }
                    for (var i = 0; i < counter; i++) {

                        console.log(i);
                        ctx.beginPath();
                        if (i > 0 && i < counter) {
                            ctx.moveTo(0 + i*gridSpace, 0);
                            ctx.lineTo(0 + i*gridSpace, cHeight);
                        }
                        
                        ctx.lineWidth = lineWidth;
                        ctx.font = fontStyle + 'pt Calibri';
                        ctx.fillStyle = fontColor;
                        var cont = $('[data-column="' + (i + 1) + '"]').val();
                        var l = ctx.measureText(cont);
                        var center = setX(l.width, 0 + (i) * gridSpace, 0 + (i + 1) * gridSpace);
                        console.log(cont);
                        ctx.fillText(cont, center, 0.8 * cHeight);
                        ctx.strokeStyle = lineColor;
                        ctx.stroke();


                    }



                };


                var renderImage = function(file) {
                    var canvas = document.getElementById('tutorial');
                    $(canvas).attr('data-file', 'true');
                    var ctx = canvas.getContext('2d');
                    ctx.mozImageSmoothingEnabled = false;
                    ctx.webkitImageSmoothingEnabled = false;
                    ctx.msImageSmoothingEnabled = false;
                    ctx.imageSmoothingEnabled = false;
                    $('canvas').attr('height', file.height).attr('width', file.width);
                    ctx.drawImage(file, 0, 0, file.width, file.height);
                    imageData = ctx.getImageData(0, 0, file.width, file.height);


                };
                var handleFileSelect = function(evt) {
                    evt.stopPropagation();
                    evt.preventDefault();

                    var files = evt.dataTransfer.files; // FileList object.

                    // files is a FileList of File objects. List some properties.
                    var output = [];
                    for (var i = 0, f; f = files[i]; i++) {
                        console.log(f);


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

                }

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
                        $('[data-column]').fadeOut();
                        $('[data-column="1"]').fadeIn();
                        gridCounter.on('change', function() {
                            var counter = $(this).val();
                            console.log(counter);
                            $('[data-column]').hide();
                            for (var i = 1; i <= counter; i++) {
                                $('[data-column="' + i + '"]').fadeIn();
                            }
                        });
                        gridGenerate.on('click', renderGrid);
                        btnSave.on('click', function() {
                            download(this, 'tutorial' , guid());
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
