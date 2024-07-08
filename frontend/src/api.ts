import axios from "axios";

export interface Car {
    carnumber: string;
    make: string;
    model: string;
    colour: string;
    owner: string;
};

interface CarRecord {
    make: string;
    model: string;
    colour: string;
    owner: string;
};
interface CarResponse {
    Key: string;
    Record: CarRecord;
};

const API_URL = "http://localhost:8000";

// gin: /queryallcars
// example data: [{"Key":"CAR0","Record":{"make":"Toyota","model":"Prius","colour":"blue","owner":"Tomoko"}},{"Key":"CAR1","Record":{"make":"Ford","model":"Mustang","colour":"red","owner":"Brad"}},{"Key":"CAR2","Record":{"make":"Hyundai","model":"Tucson","colour":"green","owner":"Jin Soo"}},{"Key":"CAR3","Record":{"make":"Volkswagen","model":"Passat","colour":"yellow","owner":"Max"}},{"Key":"CAR4","Record":{"make":"Tesla","model":"S","colour":"black","owner":"Adriana"}},{"Key":"CAR5","Record":{"make":"Peugeot","model":"205","colour":"purple","owner":"Michel"}},{"Key":"CAR6","Record":{"make":"Chery","model":"S22L","colour":"white","owner":"Aarav"}},{"Key":"CAR7","Record":{"make":"Fiat","model":"Punto","colour":"violet","owner":"Pari"}},{"Key":"CAR8","Record":{"make":"Tata","model":"Nano","colour":"indigo","owner":"Valeria"}},{"Key":"CAR9","Record":{"make":"Holden","model":"Barina","colour":"brown","owner":"Shotaro"}},{"Key":"test","Record":{"make":"test","model":"test","colour":"test","owner":"test"}}]
export async function queryAllCars(): Promise<Car[]> {
    const response = await axios.get(`${API_URL}/queryallcars`);
    const resp: CarResponse[] = response.data;

    return resp.map((car) => {
        return {
            carnumber: car.Key,
            make: car.Record.make,
            model: car.Record.model,
            colour: car.Record.colour,
            owner: car.Record.owner,
        };
    });
}

// gin: /querycar?car=<carnumber>
// example data: {"make":"test","model":"test","colour":"test","owner":"test"}
export async function queryCar(carnumber: string): Promise<Car> {
    const response = await axios.get(`${API_URL}/querycar?car=${carnumber}`);
    const resp: CarRecord = response.data;

    return {
        carnumber: carnumber,
        make: resp.make,
        model: resp.model,
        colour: resp.colour,
        owner: resp.owner,
    };
}

// gin: POST /createcar
// no return data
export async function createCar(car: Car): Promise<void> {
    await axios.post(`${API_URL}/createcar`, car);
}

// gin: POST /changecarowner
/* 		type ChangeOwnerRequest struct {
			CarNumber string `json:"carnumber"`
			NewOwner  string `json:"newowner"`
		} */
// return modified car
export async function changeCarOwner(carnumber: string, newowner: string): Promise<Car> {
    const response = await axios.post(`${API_URL}/changecarowner`, {
        carnumber: carnumber,
        newowner: newowner,
    });
    const resp: CarRecord = response.data;

    return {
        carnumber: carnumber,
        make: resp.make,
        model: resp.model,
        colour: resp.colour,
        owner: resp.owner,
    };
}
