export const formatedNumber =(price:string) =>{ 
  return Number(price).toLocaleString("es-CO",{style:'decimal',currency:"Cop"})
}