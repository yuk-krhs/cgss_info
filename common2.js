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

function createSorters()
{
    var args    = [].slice.call(arguments);
    var sorter  = [];

    for(let i of args)
        sorter.push({ getter: i[0], compare: i[1] });

    return sorter;
}

function compareNumber(a, b)  { return a.value - b.value; }
function compareString(a, b)  { return a.value.localeCompare(b.value); }
function compareRank(a, b)    { return a.value[0] == b.value[0] ? a.value[1]-b.value[1] : a.value[0]-b.value[0]; }

function sortTable(data, sorter, asc)
{
    var getter  = sorter.getter;
    var compare = sorter.compare;

    if(asc) data.sort((a, b) => compare(getter(a), getter(b)));
    else    data.sort((a, b) => compare(getter(b), getter(a)));
}
