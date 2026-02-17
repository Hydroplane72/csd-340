//Create a button for each tag that will replace the underscores when selected.
function changeText(id) {
    if (id === 'Size') {
        document.getElementById(id).innerHTML = 'small';
    }
    else if (id === 'Role') {
        document.getElementById(id).innerHTML = 'boy';
    }
    else if (id === 'husband_Relation') {
        document.getElementById(id).innerHTML = 'mother-in-law';
    }
    else if (id === 'humourist') {
        document.getElementById(id).innerHTML = 'humourist';
    }
}