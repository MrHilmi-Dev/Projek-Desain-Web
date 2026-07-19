
    let currentPrice = 0;
    let finalTotal = 0;
    let currentMode = "ticket";
    let currentItemName = "";
    let currentQty = 1;
    let selectedPaymentMethod = null;
    const SHIPPING_COST = 15000;

    /* =========================
       POPUP TIKET
    ========================= */

    function openPopup(city, price){

        currentPrice = price;

        document.getElementById("popupTitle").innerText =
            "BELI TIKET - " + city;

        document.getElementById("ticketName").value = "";

        document.getElementById("ticketEmail").value = "";

        document.getElementById("ticketAmount").value = 1;

        updateTotal();

        document
            .getElementById("ticketPopup")
            .classList.add("active");

    }

    function closePopup(){

        document
            .getElementById("ticketPopup")
            .classList.remove("active");

    }

    function updateTotal(){

        const amount =
            parseInt(document.getElementById("ticketAmount").value) || 1;

        finalTotal =
            (amount * currentPrice) + 5000;

        document.getElementById("ticketPrice").innerText =
            "Rp" + currentPrice.toLocaleString("id-ID");

        document.getElementById("totalPrice").innerText =
            "Rp" + finalTotal.toLocaleString("id-ID");

    }

    /* =========================
       POPUP MERCH
    ========================= */

    function openMerchPopup(item,price){

        currentPrice = price;
        currentItemName = item;

        document.getElementById("merchPopupTitle").innerText =
            "BELI - " + item;

        document.getElementById("merchName").value = "";

        document.getElementById("merchPhone").value = "";

        document.getElementById("merchAddress").value = "";

        document.getElementById("merchNote").value = "";

        document.getElementById("merchAmount").value = 1;

        document.getElementById("merchSize").value = "";

        const sizeField = document.getElementById("merchSizeField");

        if(item.toUpperCase().includes("KAOS")){

            sizeField.style.display = "block";

        } else {

            sizeField.style.display = "none";

        }

        updateMerchTotal();

        document
            .getElementById("merchPopup")
            .classList.add("active");

    }

    function closeMerchPopup(){

        document
            .getElementById("merchPopup")
            .classList.remove("active");

    }

    function updateMerchTotal(){

        const amount =
            parseInt(document.getElementById("merchAmount").value) || 1;

        currentQty = amount;

        finalTotal =
            (amount * currentPrice) + 5000 + SHIPPING_COST;

        document.getElementById("merchPrice").innerText =
            "Rp" + currentPrice.toLocaleString("id-ID");

        document.getElementById("merchTotalPrice").innerText =
            "Rp" + finalTotal.toLocaleString("id-ID");

    }

    /* =========================
       PEMBAYARAN
    ========================= */

    function openPaymentPopup(type){

        currentMode = type;

        let valid = true;

        if(type === "ticket"){

            const name = document.getElementById("ticketName");
            const email = document.getElementById("ticketEmail");

            name.classList.remove("field-error");
            email.classList.remove("field-error");

            if(name.value.trim() === ""){
                name.classList.add("field-error");
                valid = false;
            }

            if(
                email.value.trim() === "" ||
                !email.value.includes("@")
            ){
                email.classList.add("field-error");
                valid = false;
            }

            if(!valid){
                alert("Mohon isi Nama dan Email dengan benar.");
                return;
            }

            document.getElementById("successTicketName").innerText =
                name.value;

            document.getElementById("successTicketEmail").innerText =
                email.value;

            closePopup();

        }

        if(type === "merch"){

            const name = document.getElementById("merchName");
            const phone = document.getElementById("merchPhone");
            const address = document.getElementById("merchAddress");
            const sizeField = document.getElementById("merchSizeField");
            const size = document.getElementById("merchSize");

            name.classList.remove("field-error");
            phone.classList.remove("field-error");
            address.classList.remove("field-error");
            size.classList.remove("field-error");

            if(name.value.trim() === ""){
                name.classList.add("field-error");
                valid = false;
            }

            if(
                phone.value.trim() === "" ||
                phone.value.trim().length < 9
            ){
                phone.classList.add("field-error");
                valid = false;
            }

            if(address.value.trim() === ""){
                address.classList.add("field-error");
                valid = false;
            }

            if(
                sizeField.style.display !== "none" &&
                size.value === ""
            ){
                size.classList.add("field-error");
                valid = false;
            }

            if(!valid){
                alert("Mohon lengkapi semua data pengiriman dengan benar.");
                return;
            }

            document.getElementById("successMerchName").innerText =
                name.value;

            document.getElementById("successMerchPhone").innerText =
                phone.value;

            document.getElementById("successMerchAddress").innerText =
                address.value;

            let noteText = document.getElementById("merchNote").value || "-";

            if(sizeField.style.display !== "none" && size.value !== ""){
                noteText = "Ukuran: " + size.value + (noteText !== "-" ? " | " + noteText : "");
            }

            document.getElementById("successMerchDetail").innerText =
                noteText;

            closeMerchPopup();

        }

        document.getElementById("paymentTotal").innerText =
            "Rp" + finalTotal.toLocaleString("id-ID");

        selectedPaymentMethod = null;

        document.querySelectorAll("#paymentPopup .payment-btn").forEach(btn=>{
            btn.classList.remove("active");
        });

        document
            .getElementById("paymentPopup")
            .classList.add("active");

    }

    /* =========================
       BAYAR
    ========================= */

    function finishPayment(){

      if(!selectedPaymentMethod){

        alert("Silakan pilih metode pembayaran terlebih dahulu.");
        return;

      }

      const button = document.querySelector("#paymentPopup .btn-filled");

      button.disabled = true;
      button.innerText = "MEMPROSES...";

      setTimeout(function(){

        document
          .getElementById("paymentPopup")
          .classList.remove("active");

        const code =
          "SLR-" +
          Math.floor(Math.random()*999999)
          .toString()
          .padStart(6,"0");

        if(currentMode==="ticket"){

          document.getElementById("ticketQR").innerHTML =

          '<img src="https://cdn.pixabay.com/photo/2023/02/28/01/50/qr-code-7819652_1280.jpg" style="width:200px;height:200px;border:1px solid #000;">';

          document
            .getElementById("successTicketPopup")
            .classList.add("active");

        }

        else{

          document.getElementById("successMerchCode").innerText =
            code;

          document.getElementById("successMerchItem").innerText =
            currentItemName + " x" + currentQty;

          document.getElementById("successMerchTotal").innerText =
            "Rp" + finalTotal.toLocaleString("id-ID");

          document
            .getElementById("successMerchPopup")
            .classList.add("active");

        }

        button.disabled = false;
        button.innerText = "BAYAR SEKARANG";

      },1200);

    }

    /* =====================================
       RESET SEMUA FORM
    ===================================== */

    function resetForms(){

        const forms=document.querySelectorAll("input, textarea, select");

        forms.forEach(el=>{

            if(el.type==="number"){

                el.value=1;

            }

            else{

                el.value="";

            }

        });

    }

    /* =========================
       TUTUP POPUP SUKSES
    ========================= */

    function closeSuccessPopup(type){

        if(type === "ticket"){

            document
                .getElementById("successTicketPopup")
                .classList.remove("active");

        }

        else{

            document
                .getElementById("successMerchPopup")
                .classList.remove("active");

        }

        resetForms();

    }

    /* =========================
       PILIH METODE PEMBAYARAN
    ========================= */

    document.querySelectorAll("#paymentPopup .payment-btn").forEach(btn=>{

        btn.addEventListener("click", function(){

            document.querySelectorAll("#paymentPopup .payment-btn").forEach(b=>{
                b.classList.remove("active");
            });

            btn.classList.add("active");

            selectedPaymentMethod = btn.innerText.trim();

        });

    });




    /* ==========================
       CUSTOM MUSIC PLAYER
    ========================== */

    function formatTime(sec){

        if(isNaN(sec) || !isFinite(sec)) return "0:00";

        const m = Math.floor(sec/60);
        const s = Math.floor(sec%60).toString().padStart(2,"0");

        return m + ":" + s;

    }

    const musicCards = document.querySelectorAll(".music-card");

    musicCards.forEach(card=>{

        const audio = card.querySelector("audio");
        const playBtn = card.querySelector(".play-btn");
        const progressTrack = card.querySelector(".progress-track");
        const progressFill = card.querySelector(".progress-fill");
        const currentTimeEl = card.querySelector(".time-current");
        const durationEl = card.querySelector(".time-duration");

        playBtn.addEventListener("click", function(){

            if(audio.paused){

                musicCards.forEach(otherCard=>{

                    const otherAudio = otherCard.querySelector("audio");
                    const otherBtn = otherCard.querySelector(".play-btn");

                    if(otherAudio !== audio){

                        otherAudio.pause();
                        otherBtn.innerHTML = "▶";

                    }

                });

                audio.play();
                playBtn.innerHTML = "❚❚";

                const videoUrl = card.dataset.video;

                if(videoUrl){

                    openVideoPopup(videoUrl, true);

                }

            } else {

                audio.pause();
                playBtn.innerHTML = "▶";

            }

        });

        audio.addEventListener("timeupdate", function(){

            const percent = (audio.currentTime / audio.duration) * 100 || 0;

            progressFill.style.width = percent + "%";
            currentTimeEl.textContent = formatTime(audio.currentTime);

        });

        audio.addEventListener("loadedmetadata", function(){

            durationEl.textContent = formatTime(audio.duration);

        });

        audio.addEventListener("ended", function(){

            playBtn.innerHTML = "▶";
            progressFill.style.width = "0%";

        });

        progressTrack.addEventListener("click", function(e){

            const rect = progressTrack.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;

            if(audio.duration){

                audio.currentTime = percent * audio.duration;

            }

        });

    });



    window.addEventListener("click",function(e){

        [
            "ticketPopup",
            "merchPopup",
            "paymentPopup",
            "successTicketPopup",
            "successMerchPopup",
            "videoPopup"
        ].forEach(id=>{

            const popup=document.getElementById(id);

            if(popup && e.target===popup){

                popup.classList.remove("active");

            }

        });

    });


    document.addEventListener("keydown",function(e){

        if(e.key==="Escape"){

            [
                "ticketPopup",
                "merchPopup",
                "paymentPopup",
                "successTicketPopup",
                "successMerchPopup",
                "videoPopup"
            ].forEach(id=>{

                const popup=document.getElementById(id);

                if(popup){

                    popup.classList.remove("active");

                }

            });

        }

    });



    /* ===========================
       VIDEO POPUP
    =========================== */

    function getYoutubeEmbedUrl(url){

        let videoId = null;

        const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
        const longMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
        const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);

        if(shortMatch) videoId = shortMatch[1];
        else if(longMatch) videoId = longMatch[1];
        else if(embedMatch) videoId = embedMatch[1];

        if(!videoId) return null;

        return "https://www.youtube.com/embed/" + videoId + "?autoplay=1";

    }

    function openVideoPopup(video, keepAudioPlaying){

        if(!keepAudioPlaying){

            document.querySelectorAll(".music-card audio").forEach(audio=>{
                audio.pause();
            });

            document.querySelectorAll(".music-card .play-btn").forEach(btn=>{
                btn.innerHTML = "▶";
            });

        }

        const videoTag = document.getElementById("videoPlayer");
        const youtubeTag = document.getElementById("youtubePlayer");

        const isYoutube =
            video.includes("youtube.com") || video.includes("youtu.be");

        if(isYoutube){

            const embedUrl = getYoutubeEmbedUrl(video);
            const muteParam = keepAudioPlaying ? "&mute=1" : "";

            videoTag.pause();
            videoTag.src = "";
            videoTag.classList.add("hidden");

            youtubeTag.src = (embedUrl || "") + muteParam;
            youtubeTag.classList.remove("hidden");

        } else {

            youtubeTag.src = "";
            youtubeTag.classList.add("hidden");

            videoTag.src = video;
            videoTag.muted = !!keepAudioPlaying;
            videoTag.classList.remove("hidden");

        }

        document
            .getElementById("videoPopup")
            .classList.add("active");

    }

    function closeVideoPopup(){

        const videoTag = document.getElementById("videoPlayer");
        const youtubeTag = document.getElementById("youtubePlayer");

        videoTag.pause();
        videoTag.src = "";

        youtubeTag.src = "";

        document
            .getElementById("videoPopup")
            .classList.remove("active");

    }




    /* ===========================
       CONTACT FORM (FORMSPREE)
    =========================== */

    const contactForm = document.getElementById("contactForm");

    if(contactForm){

        contactForm.addEventListener("submit", function(e){

            e.preventDefault();

            const statusEl = document.getElementById("contactStatus");
            const submitBtn = document.getElementById("contactSubmitBtn");

            const originalBtnText = submitBtn.innerText;

            submitBtn.disabled = true;
            submitBtn.innerText = "MENGIRIM...";

            statusEl.classList.add("hidden");

            fetch(contactForm.action, {

                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    "Accept": "application/json"
                }

            })
            .then(function(response){

                if(response.ok){

                    statusEl.textContent =
                        "Pesan berhasil terkirim! Terima kasih sudah menghubungi kami.";

                    statusEl.className =
                        "text-center font-bold text-green-400";

                    contactForm.reset();

                } else {

                    statusEl.textContent =
                        "Gagal mengirim pesan. Silakan coba lagi nanti.";

                    statusEl.className =
                        "text-center font-bold text-red-500";

                }

            })
            .catch(function(){

                statusEl.textContent =
                    "Gagal mengirim pesan. Periksa koneksi internet kamu.";

                statusEl.className =
                    "text-center font-bold text-red-500";

            })
            .finally(function(){

                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;

            });

        });

    }




    /* ===========================
       MOBILE MENU TOGGLE
    =========================== */

    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    if(menuButton && mobileMenu){

        menuButton.addEventListener("click", function(){

            mobileMenu.classList.toggle("hidden");

        });

        document.querySelectorAll("#mobileMenu a").forEach(function(link){

            link.addEventListener("click", function(){

                mobileMenu.classList.add("hidden");

            });

        });

    }

