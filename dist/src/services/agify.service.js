import axios from "axios";
import { AppError } from "@/utils/apperror.utils";
export const getAgeData = async (name) => {
    const { data } = await axios.get(`https://api.agify.io?name=${name}`);
    //age group based classification
    if (!data.age) {
        throw new AppError("Agify returned an invalid response", 502);
    }
    const classifyAgeGroup = (age) => {
        if (age <= 12)
            return "child";
        if (age <= 19)
            return "teenager";
        if (age <= 59)
            return "adult";
        return "senior";
    };
    return {
        age: data.age,
        age_group: classifyAgeGroup(data.age),
    };
};
