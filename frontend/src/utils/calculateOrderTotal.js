export function calculateOrderTotal(orderItems) {
        const totalCartAmount = orderItems && orderItems.length > 0 ?
        orderItems.reduce((sum, currentItem) => sum + (
            currentItem.salePrice > 0 ? currentItem.salePrice : currentItem.price
        ) * currentItem.quantity, 0) : 0

    const totalDiscount = orderItems && orderItems.length > 0 ?
        orderItems.reduce((sum, currentItem) => sum + (
            currentItem.salePrice > 0 ? currentItem.price - currentItem.salePrice : 0
        ) * currentItem.quantity, 0) : 0

    const subtotalAmount = orderItems && orderItems.length > 0 ?
        orderItems.reduce((sum, currentItem) => sum + (
            currentItem.price
        ) * currentItem.quantity, 0) : 0

    return { subtotalAmount, totalDiscount, totalCartAmount };
}