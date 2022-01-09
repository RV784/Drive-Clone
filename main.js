(function(){
    let btnAddFolder = document.querySelector("#addFolder");
    let btnAddTextFile = document.querySelector("#addTextFile");
    let divbreadcrumb = document.querySelector("#breadcrumb");
    let divContainer = document.querySelector("#container");
    let templates = document.querySelector("#templates");
    let resources = [];
    let cfid = -1; //initially in which folder we are...id -1
    let rid = 0;

    btnAddFolder.addEventListener("click", addFolder);
    btnAddTextFile.addEventListener("click", addTextFile);

    function addFolder(){
        let rname = prompt("Enter folder's name");
        if(rname != numm){
            rname = rname.trim();
        }
        if(!rname){  //empty name validation
            alert("empty name!");
            return;
        }

        //validation for uniqueness
        let alreadyExists = resources.some(r => r.rname == rname && r.pid == cfid);
        if(alreadyExists == true){
            alert(rname + " is already in use, Try some other name");
            return;
        }
        let rid = resources.length;
        let pid = cfid;
        addFolderHTML(rname, rid, cfid);

        resources.push({
            rid: rid,
            rname: rname,
            rtype: "folder",
            pid: cfid
        });
        saveToStorage();
    }

    function addTextFile(){
        let tfname = prompt("Enter text file's name");
        console.log(tfname);
    }

    function deleteFolder(){
        console.log("In delete");
    }

    function deleteTextFile(){

    }

    function renameFolder(){
        let nrname = prompt("Enter folder's name");
        if(nrname != null){
            nrname = nrname.trim();
        }
        if(!nrname){  //empty name validation
            alert("empty name!");
            return;
        }

        let spanRename = this;
        let divFolder = spanRename.parentNode;
        let divName = divFolder.querySelector("[purpose=name]");
        let orname = divName.innerHTML;
        let ridTBE = parseInt(divFolder.getAttribute("rid"));
        if(nrname == orname){
            alert("Please enter a new name.");
            return;
        }


        let alreadyExists = resources.some(r => r.rname == nrname && r.pid == cfid);
        if(alreadyExists == true){
            alert(nrname + " name already in use");
            return;
        }


        //change html
        divName.innerHTML = nrname;
        //change ram
        let ridx = resources.find(r => r.rid == ridTBE);
        resources.rname = nrname;

        //change storage
        saveToStorage();
       
    }

    function renameTextFile(){

    }

    function viewFolder(){
        console.log("In view");

    }

    function viewTextFile(){

    }

    function addFolderHTML(rname, rid, pid){
        let divFolderTemplate = templates.content.querySelector(".folder");
        let divFolder = document.importNode(divFolderTemplate, true);

        let spanRename = divFolder.querySelector("[action=rename]");
        let spanDelete = divFolder.querySelector("[action=delete]");
        let spanView = divFolder.querySelector("[action=view]");

        spanRename.addEventListener("click", renameFolder);
        spanDelete.addEventListener("click", deleteFolder);
        spanView.addEventListener("click", viewFolder);

        let divName = divFolder.querySelector("[purpose=name]");
        divName.innerHTML = rname;
        divFolder.setAttribute("rid", rid);
        divFolder.setAttribute("pid", pid);

        divContainer.appendChild(divFolder);

    }

    function saveToStorage(){
        let rjson = JSON.stringify(resources); //convert jso to string json which can be saved in local storage
        localStorage.setItem("data", rjson);

    }

    function loadFromStorage(){
        let rjson = localStorage.getItem("data");
        resources = JSON.parse(rjson);
        if(!!rjson){
        for(let i = 0 ; i < resources.length ; i++){
            if(resources[i].pid == cfid){
                addFolderHTML(resources[i].rname, resources[i].rid, resources[i].pid);
            }

            if(resources[i].rid > rid){
                rid = resources[i].rid
            }
        }
    }
    }

    loadFromStorage();

})();































// (function () {
//     let btnAddFolder = document.querySelector("#btnAddFolder");
//     let divBreadCrumb = document.querySelector("#divBreadCrumb");
//     let aRootPath = document.querySelector(".path");
//     let divContainer = document.querySelector("#divContainer");
//     let pageTemplates = document.querySelector("#pageTemplates");
//     let folders = [];
//     let cfid = -1; // id of the folder in which we are
//     let fid = -1;

//     btnAddFolder.addEventListener("click", addFolder);
//     aRootPath.addEventListener("click", navigateBreadcrumb);

//     function addFolder() {
//         let fname = prompt("Enter folder's name");
//         if (!!fname) {
//             let exists = folders.some(f => f.name == fname);
//             if (exists == false) {
//                 fid++;
//                 folders.push({
//                     id: fid,
//                     name: fname,
//                     pid: cfid
//                 });
//                 addFolderHTML(fname, fid, cfid);
//                 saveToStorage();
//             } else {
//                 alert(fname + " already exists");
//             }
//         } else {
//             alert("Please enter a name");
//         }
//     }

//     function editFolder() {
//         let divFolder = this.parentNode;
//         let divName = divFolder.querySelector("[purpose='name']");
//         let ofname = divName.innerHTML;

//         let nfname = prompt("Enter new name for " + ofname);
//         if (!!nfname) {
//             if (nfname != ofname) {
//                 let exists = folders.filter(f => f.pid == cfid).some(f => f.name == nfname);
//                 if (exists == false) {
//                    // ram
//                    let folder = folders.filter(f => f.pid == cfid).find(f => f.name == ofname);
//                    folder.name = nfname;

//                    // html
//                    divName.innerHTML = nfname;

//                    // storage
//                    saveToStorage();
//                 } else {
//                     alert(nfname + " already exists");
//                 }
//             } else {
//                 alert("This is the old name only. Please enter something new.");
//             }
//         } else {
//             alert("Please enter a name");
//         }
//     }

//     function deleteFolder() {
//         let divFolder = this.parentNode;
//         let divName = divFolder.querySelector("[purpose='name']");
//         let fidtbd = divFolder.getAttribute("fid");

//         let flag = confirm("Are you sure you want to delete " + divName.innerHTML + "?");
//         if (flag == true) {
//             let exists = folders.some(f => f.pid == fidtbd);
//             if(exists == false){
//                 // ram
//                 let fidx = folders.findIndex(f => f.id == fidtbd);
//                 folders.splice(fidx, 1);

//                 // html
//                 divContainer.removeChild(divFolder);

//                 // storage
//                 saveToStorage();
//             } else {
//                 alert("Can't delete. Has children.");
//             }
//         }
//     }

//     //
//     function navigateBreadcrumb(){
//         let fname = this.innerHTML;
//         cfid = parseInt(this.getAttribute("fid"));
 
//         divContainer.innerHTML = "";
//         folders.filter(f => f.pid == cfid).forEach(f => {
//             addFolderHTML(f.name, f.id, f.pid);
//         });

//         while(this.nextSibling){
//             this.parentNode.removeChild(this.nextSibling);
//         }
//     }

//     // 10:40 to 10:55
//     function viewFolder(){
//         let divFolder = this.parentNode;
//         let divName = divFolder.querySelector("[purpose='name']");
//         cfid = parseInt(divFolder.getAttribute("fid"));

//         let aPathTemplate = pageTemplates.content.querySelector(".path");
//         let aPath = document.importNode(aPathTemplate, true);

//         aPath.innerHTML = divName.innerHTML;
//         aPath.setAttribute("fid", cfid);
//         aPath.addEventListener("click", navigateBreadcrumb);
//         divBreadCrumb.appendChild(aPath);

//         divContainer.innerHTML = "";
//         folders.filter(f => f.pid == cfid).forEach(f => {
//             addFolderHTML(f.name, f.id, f.pid);
//         });
//     }

//     function addFolderHTML(fname, fid, pid) {
//         let divFolderTemplate = pageTemplates.content.querySelector(".folder");
//         let divFolder = document.importNode(divFolderTemplate, true);

//         let divName = divFolder.querySelector("[purpose='name']");
//         let spanEdit = divFolder.querySelector("[action='edit']");
//         let spanDelete = divFolder.querySelector("[action='delete']");
//         let spanView = divFolder.querySelector("[action='view']");

//         divFolder.setAttribute("fid", fid);
//         divFolder.setAttribute("pid", pid);
//         divName.innerHTML = fname;
//         spanEdit.addEventListener("click", editFolder);
//         spanDelete.addEventListener("click", deleteFolder);
//         spanView.addEventListener("click", viewFolder);

//         divContainer.appendChild(divFolder);
//     }

//     function saveToStorage() {
//         let fjson = JSON.stringify(folders);
//         localStorage.setItem("data", fjson);
//     }

//     function loadFromStorage() {
//         let fjson = localStorage.getItem("data");
//         if (!!fjson) {
//             folders = JSON.parse(fjson);
//             folders.forEach(f => {
//                 if (f.id > fid) {
//                     fid = f.id;
//                 }

//                 if(f.pid === cfid){
//                     addFolderHTML(f.name, f.id, cfid);
//                 }
//             });
//         }
//     }

//     loadFromStorage();
// })();