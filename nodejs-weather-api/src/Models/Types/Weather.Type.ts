/*  
  [WEATHER TYPE ]

  *** High temperature        => Weather hight Temperature    (VARCHAR 255)
  *** Low Temperature         => Weather hight Temperature    (VARCHAR 255)
  *** Country                 => Country Name                 (VARCHAR 255)
  *** Description             => Weather Description          (VARCHAR 1000)
*/
type Weather = {
  id: number;
  high_temperature: string;
  low_temperature: string;
  country: string;
  description?: string;
};

export default Weather;
