function createChildElement(elem, tag, id = null)
{
    var child   = document.createElement(tag);
    var args    = [].slice.call(arguments);

    if(id)
        child.id= id;

    for(let i= 3; i < args.length; ++i)
        if(args[i])
            child.classList.add(args[i]);

    elem.appendChild(child);

    return child;
}

function setAttributes(elem, attrs)
{
    for(var key in attrs)
        elem.setAttribute(key, attrs[key]);

    return elem;
}

function createSortIndices()
{
    var args    = [].slice.call(arguments);
    var indices = [];

    for(let i of args)
        indices.push({ index: [], sorter: i });

    return indices;
}

function compareNumberAsc(a, b)  { return a.value - b.value; }
function compareNumberDesc(a, b) { return b.value - a.value; }
function compareStringAsc(a, b)  { return a.value.localeCompare(b.value); }
function compareStringDesc(a, b) { return b.value.localeCompare(a.value); }
function compareRankAsc(a, b)    { return a.value[0] == b.value[0] ? a.value[1]-b.value[1] : a.value[0]-b.value[0]; }
function compareRankDesc(a, b)   { return b.value[0] == a.value[0] ? b.value[1]-a.value[1] : b.value[0]-a.value[0]; }
function sortNumber(idx, asc)    { if(asc) idx.sort(compareNumberAsc); else idx.sort(compareNumberDesc); }
function sortString(idx, asc)    { if(asc) idx.sort(compareStringAsc); else idx.sort(compareStringDesc); }
function sortRank(idx, asc)      { if(asc) idx.sort(compareRankAsc);   else idx.sort(compareRankDesc);   }
