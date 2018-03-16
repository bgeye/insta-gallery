var App = (function (k,t) {

    var url = 'https://api.instagram.com/v1/users/self/media/recent';
    var tokReqUrl = getReqUrl();               //token request url
    var arrayReqUrl = tokReqUrl.split('=');    //filter token from url
    var token = arrayReqUrl[1];
    var reqUrl = url+'?access_token='+token;   //create content request url


    var init = function () {

        getImages();
    };

    function getImages(){

        t.get(reqUrl,function(resData){

            resData.data.forEach(function(element){
                var resImage = element.images.standard_resolution.url;
                var resTag = element.caption.text;
                appendImages(resImage,resTag);
            });

            //insta profile image once
            var resUsrImg = resData.data[0].caption.from.profile_picture;
            appendUserImage(resUsrImg);
        });
    }

    function appendUserImage(usrImg){
        var imgContainer = document.querySelector('.header__profile');
        var imgItem = document.createElement('img');
        imgItem.setAttribute('src',usrImg);
        imgItem.classList.add('header__profImg');
        imgContainer.appendChild(imgItem);

    }



    function appendImages(srcUrl,tag){
        var imageContainer = document.querySelector('.main');
        var imgItem = document.createElement('div');
        imgItem.classList.add('image__item');
        imgItem.style.backgroundImage = 'url('+srcUrl+')';
        imageContainer.appendChild(imgItem);
        //append tags
        var tagContainer = document.createElement('div');
        tagContainer.classList.add('image__tag');
        tagContainer.innerHTML='<span>'+tag.split(', ')+'</span>';
        imgItem.appendChild(tagContainer);

    }


    function getReqUrl(){
            var key = k.getKey();
            return key;
        }


    return {
        init: init
    };

})(Key,Tools);
App.init();
