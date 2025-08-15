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
                background: rgba(0, 0, 0, 0.85);
                color: white;
                font-family: Arial, sans-serif;
                font-size: 1.5em;
                padding: 100px 40px;
                border-radius: 12px;
                box-shadow: 0 4px 16px rgba(0,0,0,0.3);
                max-width: 400px;
                margin: 40px auto;
                text-align: center;
            ">
                ${options.text || "Welcome to your dashboard"}
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', widgetHTML);
    }
}