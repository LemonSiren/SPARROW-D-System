function createPopOutMenu(options = {}) {
    if (!document.getElementById('mySidemenu')) {
        const menuHTML = `
            <button id="openMenuBtn" onclick="openMenu()">☰ Open Menu</button>
            <div id="mySidemenu" class="sidemenu">
                <a href="javascript:void(0)" class="closebtn" onclick="closeMenu()">&times;</a>
                <a href="#">${options.homeText || "Home"}</a>
                <a href="#">${options.reportText || "Monthly Report"}</a>
                <a href="${options.servicesHref || "Services(SPARROW).html"}">${options.servicesText || "Services"}</a>
                <a href="#">${options.contactText || "Contact"}</a>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', menuHTML);
        window.openMenu = function() {
            document.getElementById("mySidemenu").style.width = "250px";
        }
        window.closeMenu = function() {
            document.getElementById("mySidemenu").style.width = "0";
        }
    }
}


function createWelcomeWidget(options = {}) {
    if (!document.getElementById('welcomeWidget')) {
        const widgetHTML = `
            <div id="welcomeWidget" style="
                background: linear-gradient(135deg, rgba(46,204,64,0.7) 0%, rgba(255,255,255,0.7) 50%, rgba(255,230,0,0.7) 100%);
                color: #222;
                font-family: Arial, sans-serif;
                font-size: 1.5em;
                padding: 70px 40px;
                border-radius: 12px;
                box-shadow: 0 4px 16px rgba(255, 255, 255, 1);
                max-width: 400px;
                margin: 40px auto;
                text-align: center;
                position: absolute;   
                top: -80px; 
                right: 500px;
                left: 500px;
            ">
                ${options.text || "Welcome to your dashboard"}
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', widgetHTML);
    }
}

/*Unuseable as of now */
function createLiveDataWidget(options = {}) {
    if (!document.getElementById('liveDataWidget')) {
        const widgetHTML = `
            <div id="liveDataWidget" style="
                background: rgba(0, 0, 0, 0.85);
                color: white;
                font-family: Arial, sans-serif;
                font-size: 1.2em;
                padding: 40px 30px;
                border-radius: 12px;
                box-shadow: 0 4px 16px rgba(0,0,0,0.3);
                max-width: 400px;
                margin: 20px auto;
                text-align: center;
            ">
                <div id="liveDataTitle">${options.title || "Live Data"}</div>
                <div id="liveDataContent">Loading...</div>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', widgetHTML);

        // Fetch data from API
        fetch(options.apiUrl)
            .then(response => response.json())
            .then(data => {
                // You can customize how data is displayed
                document.getElementById('liveDataContent').innerText =
                    options.formatData ? options.formatData(data) : JSON.stringify(data, null, 2);
            })
            .catch(error => {
                document.getElementById('liveDataContent').innerText = "Error loading data.";
            });
    }
}