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

function createVerticalSubMenu(options = {}) {
    if (!document.getElementById('verticalSubMenu')) {
        const submenuHTML = `
            <button id="openSubMenuBtn" onclick="openSubMenu()" style="
                position: fixed;
                top: 80px;
                left: 0;
                z-index: 2;
                font-size: 18px;
                background: #2ecc40;
                color: #fff;
                border: none;
                padding: 10px 20px;
                border-radius: 0 8px 8px 0;
                cursor: pointer;
            ">☰ [Placeholder]</button>
            <div id="verticalSubMenu" style="
                height: 100%;
                width: 0;
                position: fixed;
                z-index: 2;
                top: 0;
                left: 0;
                background: linear-gradient(180deg, rgba(46,204,64,0.7) 0%, rgba(255,255,255,0.7) 80%, rgba(255,230,0,0.7) 100%);
                overflow-x: hidden;
                transition: 0.3s;
                padding-top: 100px;
                box-shadow: 2px 0 8px rgba(0,0,0,0.2);
            ">
                <a href="javascript:void(0)" style="
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    font-size: 36px;
                    color: #222;
                    text-decoration: none;
                " onclick="closeSubMenu()">&times;</a>
                <a href="#" style="display:block;padding:16px 32px;color:#222;font-size:20px;text-decoration:none;">${options.item1 || "Subitem 1"}</a>
                <a href="#" style="display:block;padding:16px 32px;color:#222;font-size:20px;text-decoration:none;">${options.item2 || "Subitem 2"}</a>
                <a href="#" style="display:block;padding:16px 32px;color:#222;font-size:20px;text-decoration:none;">${options.item3 || "Subitem 3"}</a>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', submenuHTML);
        window.openSubMenu = function() {
            document.getElementById("verticalSubMenu").style.width = "220px";
        }
        window.closeSubMenu = function() {
            document.getElementById("verticalSubMenu").style.width = "0";
        }
    }
}