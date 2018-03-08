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
            console.log(resData);
            resData.data.forEach(function(element){
                var resImage = element.images.standard_resolution.url;
                var resTag = element.caption.text;
                appendImages(resImage,resTag);
            });
        })
    }



    function appendImages(srcUrl,tag){
        var imageContainer = document.querySelector('#image');
        var imgItem = document.createElement('div');
        var pic = document.createElement('img');
        imgItem.classList.add('image__item');
        pic.setAttribute('src',srcUrl);
        imgItem.appendChild(pic);
        imageContainer.appendChild(imgItem);
        //append tags
        var tagContainer = document.createElement('div');
        tagContainer.classList.add('image__tag');
        tagContainer.innerHTML='<span>'+tag.split(', ')+'</span>';
        imageContainer.appendChild(tagContainer);

    }


    function getReqUrl(){
            var key = k.getKey();
            return key;
        };


    return {
        init: init
    }

})(Key,Tools);
App.init();
