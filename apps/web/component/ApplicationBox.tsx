import React from 'react';
import { Icon } from './IconRC/Icon';
import { Text } from '../component/Text/Text'
export default function ApplicationBox({date, status, title, description, progress, buttonText}: {date: string, status: string, title: string, description: string, progress: number, buttonText: string}) {
    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="border border-blue-200 rounded-lg p-5 shadow-sm">
                <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center text-gray-500">
                        <Icon type='outline' icon='time' />
                        <span className="text-sm">{date}</span>
                    </div>
                    <div className="bg-blue-50 text-blue-600 text-sm px-3 py-1 rounded-[4px]">
                        Framtali skilað
                    </div>
                </div>

                <Text variant="h3" as="h2">Skattframtal einstaklinga 2024</Text>

                <Text marginBottom={2}>
                    Hér er nýjasta framtal þitt ásamt eldri framtölum
                </Text>
                <div className="w-full flex mb-4">
                    <div className="h-2 bg-blue-600 rounded-l-full w-2/5"></div>
                    <div className="h-2 bg-blue-100 rounded-r-full w-3/5"></div>
                </div>

                <div className="flex justify-end">
                    <button className="text-blue-600 font-medium flex items-center hover:text-blue-800 transition-colors">
                        Opna framtal
                        <Icon type='outline' icon='arrowForward' />
                    </button>
                </div>
            </div>
        </div>
    );
}