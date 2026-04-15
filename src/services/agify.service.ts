import axios from "axios";

interface AgifyResponse {
  count: number;
  name: string;
  age: number;
}

export const getAgeData = async (name: string) => {
  const { data } = await axios.get<AgifyResponse>(
    ` https://api.agify.io?name=${name}`,
  );

  //age group based classification
  if (!data.age) {
    throw new Error("Agify returned an invalid response");
  }
  const classifyAgeGroup = (age: number): string => {
    if (age <= 12) return "child";
    if (age <= 19) return "teenager";
    if (age <= 59) return "adult";
    return "senior";
  };

  return {
    age: data.age,
    age_group: classifyAgeGroup(data.age),
  };
};
