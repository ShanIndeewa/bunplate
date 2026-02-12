import { z } from "zod";
export declare const userRecommendation: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodNullable<z.ZodString>;
    userId: z.ZodString;
    recommenderUserId: z.ZodNullable<z.ZodString>;
    recommenderName: z.ZodString;
    recommenderTitle: z.ZodNullable<z.ZodString>;
    text: z.ZodNullable<z.ZodString>;
    updatedAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
    createdAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export declare const userRecommendationInsertSchema: z.ZodObject<{
    recommenderName: z.ZodString;
    recommenderTitle: z.ZodNullable<z.ZodString>;
    text: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export declare const userRecommendationUpdateSchema: z.ZodObject<{
    recommenderName: z.ZodOptional<z.ZodString>;
    recommenderTitle: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    text: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export type UserRecommendationUpdate = z.infer<typeof userRecommendationUpdateSchema>;
export type UserRecommendation = z.infer<typeof userRecommendation>;
export type UserRecommendationInsert = z.infer<typeof userRecommendationInsertSchema>;
