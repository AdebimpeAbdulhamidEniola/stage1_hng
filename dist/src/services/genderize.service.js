import axios from "axios";
import { AppError } from "../utils/apperror.utils";
export const getGenderData = async (name) => {
    const { data } = await axios.get(`https://api.genderize.io?name=${name}`);
    // edge case check
    if (!data.gender || data.count === 0) {
        throw new AppError("Genderize returned an invalid response", 502);
    }
    return {
        gender: data.gender,
        gender_probability: data.probability,
        sample_size: data.count,
    };
};
