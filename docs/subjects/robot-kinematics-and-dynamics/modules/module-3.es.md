# Unidad 3 – Dinámica del Cuerpo Rígido

## Objetivo de la Unidad

El alumno determinará los **parámetros cinemáticos y dinámicos de un cuerpo rígido** (posición, orientación, velocidad y aceleración), calculará propiedades de inercia (masa, centro de masa y tensor de inercia), y aplicará las **ecuaciones de Newton–Euler** para analizar el comportamiento dinámico de manipuladores robóticos. Además, validará los resultados mediante **simulación computacional**.

---

## 1. Introducción

En robótica, los **eslabones de un manipulador** se modelan como cuerpos rígidos: no se deforman y su movimiento se compone de **traslación** y **rotación**. El movimiento general se representa en el espacio **SE(3)** usando matrices de transformación homogénea.

La dinámica de cuerpos rígidos une **cinemática** (movimiento) y **dinámica** (fuerzas/torques), permitiendo:

* Predecir trayectorias de robots.
* Calcular torques en motores.
* Diseñar controladores dinámicos eficientes.

---

## 2. Teoría fundamental

### 2.1 Posición

La posición de un punto $P$:

$$
\mathbf r_P = \mathbf r_O + \mathbf r_{P/O}
$$

### 2.2 Velocidad

$$
\mathbf v_P = \mathbf v_O + \bm{\omega} \times \mathbf r_{P/O}
$$

### 2.3 Aceleración

$$
\mathbf a_P = \mathbf a_O + \bm{\alpha} \times \mathbf r_{P/O} + \bm{\omega} \times (\bm{\omega} \times \mathbf r_{P/O})
$$

### 2.4 Propiedades de inercia

* **Masa**: medida de la inercia traslacional.
* **Centro de masa**:

$$
\mathbf r_{\mathrm{CM}} = \frac{1}{M} \int_V \mathbf r\,\mathrm{d}m
$$

* **Tensor de inercia** (en un sistema $(x,y,z)$):

$$
I = \begin{bmatrix}
I_{xx} & -I_{xy} & -I_{xz} \\
-I_{xy} & I_{yy} & -I_{yz} \\
-I_{xz} & -I_{yz} & I_{zz}
\end{bmatrix}
$$

con $I_{xx} = \int (y^2+z^2)\,\mathrm{d}m$, etc.

### 2.5 Ecuaciones de movimiento

* **Traslación (Newton)**:

$$
\mathbf F = m\,\mathbf a_{\mathrm{CM}}
$$

* **Rotación (Euler)**:

$$
\bm{\tau} = I\,\bm{\alpha} + \bm{\omega} \times (I\,\bm{\omega})
$$

---

## 3. Ejemplos resueltos

### Ejemplo 1 – Centro de masa

Dos bloques: $m_1 = 2\,\mathrm{kg}$ en $x_1 = 0.5\,\mathrm{m}$ y $m_2 = 3\,\mathrm{kg}$ en $x_2 = 2\,\mathrm{m}$.

$$
x_{\mathrm{CM}} = \frac{m_1 x_1 + m_2 x_2}{m_1+m_2} = \frac{1+6}{5} = 1.4\,\mathrm{m}
$$

El CM está en $x=1.4\,\mathrm{m}$.

---

### Ejemplo 2 – Tensor de inercia de un cubo

Cubo macizo de lado $a=0.2\,\mathrm{m}$, masa $m=5\,\mathrm{kg}$:

$$
I_{xx} = I_{yy} = I_{zz} = \tfrac{1}{6} m a^2 = 0.033\,\mathrm{kg\,m^2}
$$

Misma inercia en los tres ejes.

---

### Ejemplo 3 – Torque requerido en un disco

Disco de $m=10\,\mathrm{kg}$, $R=0.5\,\mathrm{m}$. Se desea $\omega = 10\,\mathrm{rad/s}$ en $t=2\,\mathrm{s}$.

$$
\alpha = \frac{\Delta \omega}{\Delta t} = \frac{10}{2} = 5\,\mathrm{rad/s^2},\quad
I = \tfrac{1}{2} m R^2 = 1.25\,\mathrm{kg\,m^2},\quad
\tau = I\,\alpha = 6.25\,\mathrm{N\,m}
$$

Se requiere un torque de $6.25\,\mathrm{N\,m}$.

---

## 4. Ejercicios propuestos

### Ejercicio 1 – Barra homogénea

Barra de $m=6\,\mathrm{kg}$, $L=3\,\mathrm{m}$ apoyada en un extremo.

1. Calcular el centro de masa.
2. Momento de inercia respecto al extremo.
3. Simular la caída libre con Matlab/Python.

---

### Ejercicio 2 – Tensor de inercia de un cilindro

Cilindro macizo: $m=8\,\mathrm{kg}$, $R=0.25\,\mathrm{m}$, $h=1\,\mathrm{m}$.

1. Calcular $I_{zz}$.
2. Calcular $I_{xx}=I_{yy}$.
3. Validar en CoppeliaSim.

---

### Ejercicio 3 – Torque en un manipulador

Barra: $m=2\,\mathrm{kg}$, $L=1.5\,\mathrm{m}$ que rota en un extremo.

1. Momento de inercia.
2. Torque para alcanzar $90^\circ$ en $t=2\,\mathrm{s}$.
3. Simular en Python con animación.

---

### Ejercicio 4 – Movimiento 3D

Cubo: $m=4\,\mathrm{kg}$, $a=0.3\,\mathrm{m}$, $\bm{\omega}=(2,1,3)\,\mathrm{rad/s}$.

1. Energía cinética rotacional.
2. Torques para mantener $\bm{\omega}$ constante.
3. Video en Matlab.

---

## 5. Actividad de simulación (Python)

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.animation as animation

# Definición de un cubo (8 vértices, homogéneos)
cubo = np.array([[0,0,0,1],[1,0,0,1],[1,1,0,1],[0,1,0,1],
                 [0,0,1,1],[1,0,1,1],[1,1,1,1],[0,1,1,1]])

def transform(theta, dx):
    Rz = np.array([[np.cos(theta), -np.sin(theta), 0, 0],
                   [np.sin(theta),  np.cos(theta), 0, 0],
                   [0,0,1,0],[0,0,0,1]])
    T = np.array([[1,0,0,dx],[0,1,0,0],[0,0,1,0],[0,0,0,1]])
    return T @ Rz

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

# Conexiones de aristas del cubo para dibujar líneas
edges = [(0,1),(1,2),(2,3),(3,0),(4,5),(5,6),(6,7),(7,4),(0,4),(1,5),(2,6),(3,7)]

traj = []

def update(frame):
    ax.clear()
    M = transform(np.radians(frame*5), frame*0.1)
    cubo_t = (M @ cubo.T).T
    # dibujar aristas
    for i,j in edges:
        ax.plot([cubo_t[i,0], cubo_t[j,0]],
                [cubo_t[i,1], cubo_t[j,1]],
                [cubo_t[i,2], cubo_t[j,2]])
    # trayectoria del centroide
    c = cubo_t[:,:3].mean(axis=0)
    traj.append(c)
    T = np.array(traj)
    ax.plot(T[:,0], T[:,1], T[:,2])

    ax.set_xlim(-2,7); ax.set_ylim(-2,7); ax.set_zlim(-2,7)
    ax.set_title(f"Frame {frame}")

ani = animation.FuncAnimation(fig, update, frames=60, interval=120)
plt.show()

```

---

## 6. Evaluación

### Evidencias de aprendizaje

* **Reporte** con cálculos (CM, tensor de inercia, ecuaciones dinámicas).
* **Programa** de simulación (Python/Matlab/Octave).
* **Video/animación** del movimiento.

### Rúbrica (resumen)

| Criterio     | Excelente (100)                    | Bueno (85)        | Suficiente (70)      | Insuficiente (<70) |
| ------------ | ---------------------------------- | ----------------- | -------------------- | ------------------ |
| Reporte      | Completo, claro, con justificación | Casi completo     | Parcial, con errores | Incompleto         |
| Ejercicios   | Todos correctos                    | Mayoría correctos | Varios errores       | Sin resolver       |
| Simulación   | Clara y validada                   | Funcional         | Incompleta           | No entregada       |
| Presentación | Ordenada y con gráficas            | Ordenada          | Poco clara           | Desordenada        |

---

## 7. Bibliografía y recursos

* Craig, J. J. (2006). *Robótica*. Pearson.
* Spong, M. W., Hutchinson, S., Vidyasagar, M. (2005). *Robot Dynamics and Control*. Wiley.
* Sciavicco, L., Siciliano, B. (2000). *Modeling and Control of Robot Manipulators*. Springer.
* CoppeliaSim (Robotics Simulation): [https://www.coppeliarobotics.com/](https://www.coppeliarobotics.com/)
