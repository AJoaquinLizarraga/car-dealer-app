/** @format */

import { Suspense } from "react";

export default async function ResultPage({
  params: { makeId, year },
}: {
  params: { makeId: string; year: string };
}) {
  const res = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );
  const data = await res.json();

  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center dark:text-white">
          Models for Make ID: {makeId} in Year: {year}
        </h1>
        <ul className="list-disc pl-5 dark:text-gray-300">
          {data.Results.map(
            (model: { Model_ID: number; Model_Name: string }) => (
              <li key={model.Model_ID}>{model.Model_Name}</li>
            )
          )}
        </ul>
      </div>
    </Suspense>
  );
}

