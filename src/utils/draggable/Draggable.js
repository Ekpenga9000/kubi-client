export const draggableGetItemPos = (id, arr) => {
    const item = arr.findIndex(arrItem => arrItem.id === id);
    return item; 
}