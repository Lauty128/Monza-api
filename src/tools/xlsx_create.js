export function firstColumnGenerate(workSheet, style){
    const titlesList = ["id", "title","description","availability","inventory","condition","price","link","image_link","additional_image_link", "brand", "sale_price", "google_product_category"]

    titlesList.forEach((title,index)=>{
        workSheet.cell(1,(index+1))
            .string(title)
            .style(style)
    })
}

export function contentGenerate(workSheet, style, data, column){
    const urlMonza = 'https://www.facebook.com/MonzaAutomotor'
    const images = data.images.join(',')
    workSheet.cell(column, 1).string(`${data._id}`).style(style)
    workSheet.cell(column, 2).string(`${data.mark} ${data.version} ${data.model}`).style(style)
    workSheet.cell(column, 3).string(generateDescription(data)).style(style)
    workSheet.cell(column, 4).string((data.available ? 'in stock' : 'out of stock')).style(style)
    workSheet.cell(column, 5).string('1').style(style)
    workSheet.cell(column, 6).string('used').style(style)
    workSheet.cell(column, 7).string(`${data.price} ARS`).style(style)
    workSheet.cell(column, 8).string(urlMonza).style(style)
    workSheet.cell(column, 9).string(data.image).style(style)
    workSheet.cell(column, 10).string(images).style(style)
    workSheet.cell(column, 11).string('Vehicle').style(style)
    workSheet.cell(column, 12).string(data.sale_price || '').style(style)
    workSheet.cell(column, 13).string('888').style(style)
}

function generateDescription(data){
    return `💥Modelo: ${data.model}\n💥Motor: ${data.engine}\n💥${data.fuel}\n💥${data.transmission}\n💥${data.km.toLocaleString('es-AR')} km\n💥Traccion: ${data.traction || 'Normal'}`
}