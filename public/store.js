const content_div = document.getElementById('content_div')



function renderTodo(doc) {
    let li_content = document.createElement('li');
    let li_title = document.createElement('li');
    let title = document.createElement('span')
    let content = document.createElement('span');
    let ul = document.createElement('ul');
    let cross = document.createElement('button');

    cross.setAttribute('data-id', doc.id)
    ul.setAttribute("id", doc.id)
    cross.textContent = "x"
    title.textContent = doc.data().title
    content.textContent = doc.data().content;
    cross.setAttribute('style', "font-size: 20px; color: red; margin: 15px")
    title.setAttribute('style', "font-size: 20px; font-weight: bold; font-family: Calibri")
    li_content.setAttribute('style', "text-align: justify")
    ul.setAttribute('style', "width: 280px; border: 5px solid rgb(19, 10, 65); padding: 10px; margin: 20px;")

    li_title.appendChild(title)
    li_title.appendChild(cross)
    li_content.appendChild(content)
    ul.appendChild(li_title)
    ul.appendChild(li_content)
    content_div.appendChild(ul)

  cross.addEventListener('click', () => {
       var id = cross.getAttribute('data-id')
       db.collection("things").doc(id).delete()
  })
}

function addTodo(){
    var form_title = document.getElementById('form_title').value
    var form_content = document.getElementById('form_content').value
    db.collection('things').add({
        title: form_title,
        content: form_content,
    })
    document.getElementById('form_title').value = ""
    document.getElementById('form_content').value = ""
}


// db.collection('things').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderTodo(doc);
//     })
// }) 


db.collection('things').onSnapshot((snapshot)=> {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added'){
            renderTodo(change.doc)
        } else if (change.type == 'removed') {
            let remove_li = document.getElementById(change.doc.id)
            content_div.removeChild(remove_li)
        }
    })
})