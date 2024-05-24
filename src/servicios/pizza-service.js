export class PizzaService {
  getAllPizzas(pageSize, requestedPage) {
    // Ir a base de datos...

    const query = `select * from pizzas limit ${pageSize} offset ${requestedPage}`;
    const query2 = `select count(*) from pizzas`;
    //const pizzasInDB = query.execute();

    throw new Error("Error en el servicio  de pizzas");

    return {
      collection: query,
      pagination: {
        limit: pageSize,
        offset: requestedPage,
        nextPage: "http://localhost:3000/pizzas?limit=15&offset=1",
        total: query2,
      },
    };
  }
}

export default PizzaService;
