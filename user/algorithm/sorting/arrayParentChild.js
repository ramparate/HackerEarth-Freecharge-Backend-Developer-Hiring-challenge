// find array of object parent child

var data = [{ id: 8, name: 'Shirts', slug: 'shirts', parent_id: null },
{ id: 9, name: 'Pants', slug: 'pants', parent_id: null },
{ id: 10, name: 'Vintage Prints', slug: 'vintage-prints', parent_id: 8 },
{ id: 11, name: 'Cotton Tee', slug: 'cotton-tee', parent_id: 8 },
{ id: 12, name: 'Business Khakis', slug: 'business-khakis', parent_id: 9 }]
    .sort(function (a, b) {
        return a.name.localeCompare(b.name);
    }),
    tree = function (data, root) {
        var r = [], o = {};
        data.forEach(function (a) {
            o[a.id] = { data: a, children: o[a.id] && o[a.id].children };
            if (a.parent_id === root) {
                r.push(o[a.id]);
            } else {
                o[a.parent_id] = o[a.parent_id] || {};
                o[a.parent_id].children = o[a.parent_id].children || [];
                o[a.parent_id].children.push(o[a.id]);
            }
        });
        return r;
    }(data, null),
    sorted = tree.reduce(function traverse(r, a) {
        return r.concat(a.data, (a.children || []).reduce(traverse, []));
    }, [])

console.log(sorted);
console.log(tree);