import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import periodosData from '@/lib/periodos.json';

interface Periodo
{
    nombre: string;
    descripcion: string;
    imagen: string;
    Eventos: {
        nombre: string;
        edad: number;
        anos_hasta_hijo: number;
        anos_despues_hijo?: number;
        ano_nacimiento: number;
        ano_muerte: number;
    }[];
}

interface PeriodoContentProps
{
    nombre: string;
}

const PeriodoContent: React.FC<PeriodoContentProps> = ( { nombre } ) =>
{
    const periodo: Periodo | undefined = periodosData.Periodos[ nombre as keyof typeof periodosData.Periodos ] as Periodo;

    if ( !periodo )
    {
        return <p>Período no encontrado</p>;
    }

    return (
        <div className="py-1 px-8">
            <h1 className="text-4xl font-bold">Cronología</h1>

            { periodo.Eventos && periodo.Eventos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    { periodo.Eventos.map( ( evento, index ) => (
                        <Link key={ index } href={ `/Evento/${ encodeURIComponent( evento.nombre ) }` } passHref>
                            <Card
                                className="shadow-md transition-transform duration-300 ease-[cubic-bezier(0,0,0.5,1)] hover:scale-105 hover:shadow-lg cursor-pointer"
                            >
                                <CardHeader>
                                    <CardTitle>{ evento.nombre }</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p><strong>Edad:</strong> { evento.edad }</p>
                                    <p><strong>Años hasta el hijo:</strong> { evento.anos_hasta_hijo }</p>
                                    { evento.anos_despues_hijo !== undefined && (
                                        <p><strong>Años después del hijo:</strong> { evento.anos_despues_hijo }</p>
                                    ) }
                                    <p><strong>Año de nacimiento:</strong> { evento.ano_nacimiento }</p>
                                    <p><strong>Año de muerte:</strong> { evento.ano_muerte }</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ) ) }
                </div>
            ) : (
                <p className="text-gray-600 mt-4">No hay eventos disponibles para este período.</p>
            ) }
        </div>
    );
};

export default PeriodoContent;
