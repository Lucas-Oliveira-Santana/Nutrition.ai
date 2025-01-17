"use client";

import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Schema de validação
const formSchema = z.object({
  age: z
    .number({ invalid_type_error: "A idade deve ser um número." })
    .min(10, "Idade mínima é 10 anos.")
    .max(120, "Idade máxima é 120 anos."),
  sex: z.enum(["male", "female"], {
    required_error: "Escolha um sexo.",
  }),
  height: z
    .number({ invalid_type_error: "A altura deve ser um número." })
    .min(50, "Altura mínima é 50 cm. Deve ser escrito em centímetros. Ex: 170")
    .max(250, "Altura máxima é 250 cm."),
  weight: z
    .number({ invalid_type_error: "O peso deve ser um número." })
    .min(20, "Peso mínimo é 20 kg.")
    .max(300, "Peso máximo é 300 kg."),
  goal: z.enum(["maintain", "lose", "gain"], {
    required_error: "Escolha um objetivo.",
  }),
  activity: z.enum(["sedentary", "moderate", "athlete"], {
    required_error: "Escolha um nível de atividade física.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;


export function CaloriesForm(){
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const calculateTMB = (
    age: number,
    sex: "male" | "female",
    weight: number,
    height: number
  ) => {
    if (sex === "male") {
      return 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age;
    } else {
      return 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;
    }
  };

  const adjustCalories = (
    tmb: number,
    goal: "maintain" | "lose" | "gain",
    activity: "sedentary" | "moderate" | "athlete"
  ) => {
    let activityFactor = 1.2;
    if (activity === "moderate") activityFactor = 1.55;
    if (activity === "athlete") activityFactor = 1.9;

    const tmbWithActivity = tmb * activityFactor;

    if (goal === "lose") {
      return tmbWithActivity - 500;
    } else if (goal === "gain") {
      return tmbWithActivity + 500;
    }
    return tmbWithActivity;
  };

  const calculateMacros = (calories: number, weight: number) => {
    const proteinPerKg = 2.0;
    const fatPercentage = 0.25;

    const proteinGrams = proteinPerKg * weight;
    const fatGrams = (calories * fatPercentage) / 9;
    const remainingCalories = calories - (proteinGrams * 4 + fatGrams * 9);
    const carbGrams = remainingCalories / 4;

    return {
      protein: Math.round(proteinGrams),
      fat: Math.round(fatGrams),
      carbs: Math.round(carbGrams),
    };
  };

  const onSubmit = (data: FormSchema) => {
    const tmb = calculateTMB(data.age, data.sex, data.weight, data.height);
    const adjustedCalories = adjustCalories(tmb, data.goal, data.activity);

    const macros = calculateMacros(adjustedCalories, data.weight);

    const goalText =
      data.goal === "lose"
        ? "perder peso"
        : data.goal === "gain"
        ? "ganhar peso"
        : "manter o peso";

    setResult({
      goalText,
      adjustedCalories: Math.round(adjustedCalories),
      macros,
    });
  };

  const [result, setResult] = React.useState<{
    goalText: string;
    adjustedCalories: number;
    macros: { protein: number; fat: number; carbs: number };
  } | null>(null);


  return(
    <div id="cardapio-secao" className="font-sans min-h-screen transition-colors bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
    
          {/* Formulário e Resultado */}
          <div className="flex flex-col sm:flex-row items-center justify-center p-6 space-y-8 sm:space-y-0 sm:space-x-8">
            {/* Formulário */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white dark:bg-gray-800 dark:text-gray-200 p-8 shadow-md rounded-lg w-full max-w-md"
            >
              <h2 className="text-4xl font-bold mb-6 text-center">
                Calculadora de gasto calórico 🔥
              </h2>
    
              {/* Campo: Idade */}
              <div className="mb-4">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Idade (anos)
                </label>
                <input
                  id="age"
                  type="number"
                  {...register("age", { valueAsNumber: true })}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                />
                {errors.age && (
                  <p className="text-sm text-red-500 mt-1">{errors.age.message}</p>
                )}
              </div>
    
              {/* Campo: Sexo */}
              <div className="mb-4">
                <label
                  htmlFor="sex"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Sexo
                </label>
                <select
                  id="sex"
                  {...register("sex")}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                >
                  <option value="">Selecione</option>
                  <option value="male">Masculino</option>
                  <option value="female">Feminino</option>
                </select>
                {errors.sex && (
                  <p className="text-sm text-red-500 mt-1">{errors.sex.message}</p>
                )}
              </div>
    
              {/* Campo: Altura */}
              <div className="mb-4">
                <label
                  htmlFor="height"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Altura (cm)
                </label>
                <input
                  id="height"
                  type="number"
                  {...register("height", { valueAsNumber: true })}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                />
                {errors.height && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.height.message}
                  </p>
                )}
              </div>
    
              {/* Campo: Peso */}
              <div className="mb-4">
                <label
                  htmlFor="weight"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Peso (kg)
                </label>
                <input
                  id="weight"
                  type="number"
                  {...register("weight", { valueAsNumber: true })}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                />
                {errors.weight && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.weight.message}
                  </p>
                )}
              </div>
    
              {/* Campo: Objetivo */}
              <div className="mb-4">
                <label
                  htmlFor="goal"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Objetivo
                </label>
                <select
                  id="goal"
                  {...register("goal")}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                >
                  <option value="">Selecione</option>
                  <option value="maintain">Manter peso</option>
                  <option value="lose">Perder peso</option>
                  <option value="gain">Ganhar peso</option>
                </select>
                {errors.goal && (
                  <p className="text-sm text-red-500 mt-1">{errors.goal.message}</p>
                )}
              </div>
    
              {/* Campo: Atividade */}
              <div className="mb-4">
                <label
                  htmlFor="activity"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Nível de Atividade
                </label>
                <select
                  id="activity"
                  {...register("activity")}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                >
                  <option value="">Selecione</option>
                  <option value="sedentary">Sedentário</option>
                  <option value="moderate">Moderado</option>
                  <option value="athlete">Atleta</option>
                </select>
                {errors.activity && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.activity.message}
                  </p>
                )}
              </div>
    
              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-800 dark:bg-green-700 text-white font-medium rounded-md transition-all duration-300 hover:bg-green-950 dark:hover:bg-green-900"
              >
                Calcular
              </button>
            </form>
    
            {/* Resultado */}
            {result && (
              <div className="mt-8 bg-white dark:bg-gray-800 dark:text-gray-200 p-6 shadow-md rounded-lg text-center w-full sm:w-96">
                <h3 className="text-lg font-bold">
                  Para {result.goalText}, você deve consumir aproximadamente:
                </h3>
                <p className="text-2xl font-bold text-green-800 dark:text-green-400">
                  {result.adjustedCalories} kcal
                </p>
                <div className="mt-4">
                  <p>
                    <strong>Proteínas:</strong> {result.macros.protein}g
                  </p>
                  <p>
                    <strong>Gorduras:</strong> {result.macros.fat}g
                  </p>
                  <p>
                    <strong>Carboidratos:</strong> {result.macros.carbs}g
                  </p>
                  <button className="w-full mt-8 py-2 px-4 bg-green-800 dark:bg-green-700 text-white font-medium rounded-md transition-all duration-300 hover:bg-green-950 dark:hover:bg-green-900">
                    Gerar sugestão de cardápio
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
  )
}