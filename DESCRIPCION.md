
# DESCRIPCION DE FUNCIONALIDADES DE LA APP

## HOME PAGE

La página de inicio (HOME) presenta una funcionalidad simple de un botón que lleva a la página de dispositivos.

## DISPOSITIVOS PAGE

La página de dispositivos ofrece una funcionalidad mediante un pipe custom: un filtro dinámico aplicado a través de un botón de búsqueda. Este filtro permite al usuario buscar y filtrar la lista de dispositivos según el nombre o la ubicación ingresados. 

Se han añadido directivas custom. Una de ellas resalta el nombre del dispositivo cuando se pasa el mouse sobre él. La segunda directiva hace que al pasar el cursor sobre un dispositivo, se muestre información detallada del dispositivo, incluyendo su nombre, ID, ID de la electroválvula y ubicación.

Al seleccionar un dispositivo, se despliegan sus detalles en un componente denominado 'DetalleSensorComponent'.

Se utiliza una directiva estructural "ngFor" para formar una lista de dispositivos. Además, se emplean dos directivas estructurales "ngIf", la primera para mostrar un boton que me permita cerrar los detalles y la segunda para mostrar el componente de detalles del sensor, los dos aparecen solo cuando el usuario interactúa con alguno de los dispositivos.

## COMPONENTE DETALLE DEL DISPOSITIVO

El detalle del dispositivo contiene un gráfico de indicadores tipo 'gauge' de Highcharts, que representa las mediciones del dispositivo. Este gráfico está diseñado con un rango de valores, con un mínimo de 0 y un máximo de 100. Sin embargo, para simular nuevas mediciones conforme a las especificaciones, se genera un número entero en el rango de 0 a 60, tal como lo requiere la consigna. El gráfico exhibe la última medición registrada por el dispositivo.

El componente tambien contiene 3 botones: uno para abrir la electroválvula, otro para mostrar todas las mediciones realizadas por el dispositivo y un tercero para visualizar los logs de riego asociados a la electroválvula.

El botón de apertura de la electroválvula ofrece una funcionalidad "toggle". Cuando se presiona, desencadena la apertura de la electroválvula, y el boton pasa a ser un boton de cierre indicando su capacidad para cerrar la electroválvula. Cada cierre o apertura está acompañado de un registro en el log de riegos. Cuando la electroválvula se abre, se registra con un marcador de "apertura" con un valor de 1, simbolizando la apertura de la electrovalvula. Por otro lado, cuando la electroválvula se cierra, el registro lo refleja con un marcador de "apertura" con un valor de 0, marcando el cierre de la electrovalvula.

Además, con cada cierre de la electroválvula, se genera una medición aleatoria, un número entero que oscila entre 0 y 60 que se utiliza para simular la medicion del dispositivo. Esta medición se coloca en la tabla de mediciones de tal forma que la tabla se refresca automáticamente para mostrar la última y medicion.

El boton "Ver todas las mediciones" permite crear un tabla donde se pueden ver todas las mediciones tomadas por el dispositivo. Al igual que en el caso anterior, el boton presenta una funcionalidad "toggle" que activa la funcion de cerrar la tabla de mediciones. Recordar que, al cerrar la electrovalvula una fila sera añadida automaticamente en esta tabla que nos permite ver la nueva medicion.

El boton "Ver Log Riegos" tiene una funcionalidad similar al anterior pero en este caso despliega una tabla que permite ver todos los logs por electrovalvula. De igual forma, una vez que se presiona el boton para ver la tabla de logs, se activa la funcionalidad de cerrar la tabla de logs. Recordar tambien, que al cerrar o abrir la electrovalvula, es decir. cada vez que se inserta un registro de log, la tabla se refresca automaticamente.

Este componente presenta dos directivas estructurales "ngIf" para manejar cuando se deben mostrar las tablas de mediciones y de logs. De igual forma. el componente presenta dos directivas estructurales "ngFor" para formar las tablas de visualizacion de mediciones y logs.
