import { Request, Response } from "express";
import { signinPayload, signupPayload } from "./auth.models";
import { ApiError } from "../../utils/api.error";
import { ApiResponse } from "../../utils/api.response";
import { checkHashPassword, hashPassword } from "../../utils/hash";
import { validateEmail, createUser } from "./auth.service";
import { createToken } from "../../utils/token";
export class AuthController {
  async handleSignup(req: Request, res: Response) {
    const validationResult = await signupPayload.safeParseAsync(req.body);
    if (!validationResult.success)
      throw new ApiError(
        400,
        "validation failed",
        validationResult.error.issues,
      );
    const { firstName, lastName, email, password, role, phone } =
      validationResult.data;
    const checkEmail = await validateEmail(email);
    if (checkEmail.length > 0) throw new ApiError(400, "User already exist");

    const { salt, hash } = hashPassword(password);

    const result = await createUser({
      firstName,
      lastName,
      email,
      password: hash,
      salt,
      role,
      phone,
    });
    return new ApiResponse(201, "User signup success", result).created(res);
  }

  async handleSignin(req: Request, res: Response) {
    const validationResult = await signinPayload.safeParseAsync(req.body);
    if (!validationResult.success)
      throw new ApiError(
        400,
        "validation failed",
        validationResult.error.issues,
      );
    const { email, password } = validationResult.data;
    const [checkEmail] = await validateEmail(email);

    if (!checkEmail) throw new ApiError(400, "User details doesn't match");

    const { hash } = checkHashPassword(password, checkEmail.salt!);
    if (hash != checkEmail.password)
      throw new ApiError(400, "User details doesn't match");
    const token = createToken({ id: checkEmail.id });
    return new ApiResponse(200, "User signin successfully", { token }).created(
      res,
    );
  }
}
