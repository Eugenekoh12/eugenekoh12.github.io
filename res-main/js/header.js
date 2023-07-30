window.onscroll = function() {myFunction()};
        
        var header = document.getElementById("logo");
        var sticky = header.offsetTop;
        
        function myFunction() {
          if (window.scrollY > sticky) {
            header.classList.add("sticky");
            document.getElementById("imgLogo").style.width = "200px";
          } else {
            header.classList.remove("sticky");
            document.getElementById("imgLogo").style.width = "30%";
          }
        }
